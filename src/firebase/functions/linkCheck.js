// src/firebase/functions/linkCheck.js
// Deploy with: firebase deploy --only functions
// Keeps API keys server-side — never exposed in frontend

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const https = require('https');

const SAFE_BROWSING_KEY = defineSecret('SAFE_BROWSING_API_KEY');
const WHOIS_KEY         = defineSecret('WHOIS_API_KEY');

exports.checkLink = onCall(
  { secrets: [SAFE_BROWSING_KEY, WHOIS_KEY] },
  async (request) => {
    const { url } = request.data;
    if (!url || typeof url !== 'string') {
      throw new HttpsError('invalid-argument', 'URL is required');
    }

    let domain = '';
    try {
      domain = new URL(url).hostname.replace('www.', '');
    } catch {
      return { verdict: 'invalid', reason: 'Not a valid URL' };
    }

    // ── 1. Google Safe Browsing check ──────────────────────────
    const sbResult = await safeBrowsingCheck(url, SAFE_BROWSING_KEY.value());

    // ── 2. WHOIS domain age check ───────────────────────────────
    const whoisResult = await whoisCheck(domain, WHOIS_KEY.value());

    // ── 3. Simple rule-based heuristics ────────────────────────
    const suspiciousTLDs = ['.xyz', '.click', '.win', '.loan', '.top', '.tk', '.ml', '.ga'];
    const isSuspiciousTLD = suspiciousTLDs.some(t => domain.endsWith(t));
    const domainAgeDays   = whoisResult.ageDays || 999;
    const isNewDomain     = domainAgeDays < 30;

    let verdict = 'safe';
    if (sbResult.unsafe)        verdict = 'dangerous';
    else if (isSuspiciousTLD)   verdict = 'suspicious';
    else if (isNewDomain)       verdict = 'suspicious';

    return {
      verdict,
      domain,
      domainAgeDays,
      isNewDomain,
      isSuspiciousTLD,
      safeBrowsingFlag: sbResult.unsafe,
    };
  }
);

// ── helpers ──────────────────────────────────────────────────
function safeBrowsingCheck(url, apiKey) {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      client: { clientId: 'suraksha-shikshan', clientVersion: '1.0' },
      threatInfo: {
        threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
        platformTypes: ['ANY_PLATFORM'],
        threatEntryTypes: ['URL'],
        threatEntries: [{ url }],
      },
    });

    const options = {
      hostname: 'safebrowsing.googleapis.com',
      path: `/v4/threatMatches:find?key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ unsafe: !!(parsed.matches && parsed.matches.length > 0) });
        } catch {
          resolve({ unsafe: false });
        }
      });
    });
    req.on('error', () => resolve({ unsafe: false }));
    req.write(body);
    req.end();
  });
}

function whoisCheck(domain, apiKey) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.whoisxmlapi.com',
      path: `/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const created = parsed?.WhoisRecord?.createdDate;
          if (!created) return resolve({ ageDays: null });
          const ageDays = Math.floor((Date.now() - new Date(created).getTime()) / 86400000);
          resolve({ ageDays });
        } catch {
          resolve({ ageDays: null });
        }
      });
    });
    req.on('error', () => resolve({ ageDays: null }));
    req.end();
  });
}
