import https from 'https';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body || {};
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL is required' });
  }

  let domain = '';
  try {
    domain = new URL(url).hostname.replace('www.', '');
  } catch {
    return res.status(200).json({ verdict: 'invalid', reason: 'Not a valid URL' });
  }

  const SAFE_BROWSING_KEY = process.env.SAFE_BROWSING_API_KEY;
  const WHOIS_KEY = process.env.WHOIS_API_KEY;

  // ── 1. Google Safe Browsing check ──────────────────────────
  const sbResult = await safeBrowsingCheck(url, SAFE_BROWSING_KEY);

  // ── 2. WHOIS domain age check ───────────────────────────────
  const whoisResult = await whoisCheck(domain, WHOIS_KEY);

  // ── 3. Simple rule-based heuristics ────────────────────────
  const suspiciousTLDs = ['.xyz', '.click', '.win', '.loan', '.top', '.tk', '.ml', '.ga'];
  const isSuspiciousTLD = suspiciousTLDs.some(t => domain.endsWith(t));
  const domainAgeDays   = whoisResult.ageDays || 999;
  const isNewDomain     = domainAgeDays !== null && domainAgeDays < 30;

  let verdict = 'safe';
  if (sbResult.unsafe)        verdict = 'dangerous';
  else if (isSuspiciousTLD)   verdict = 'suspicious';
  else if (isNewDomain)       verdict = 'suspicious';

  return res.status(200).json({
    verdict,
    domain,
    domainAgeDays,
    isNewDomain,
    isSuspiciousTLD,
    safeBrowsingFlag: sbResult.unsafe,
  });
}

// ── helpers ──────────────────────────────────────────────────
function safeBrowsingCheck(url, apiKey) {
  return new Promise((resolve) => {
    if (!apiKey) {
      console.warn("SAFE_BROWSING_API_KEY environment variable is not configured.");
      return resolve({ unsafe: false });
    }
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
    if (!apiKey) {
      console.warn("WHOIS_API_KEY environment variable is not configured.");
      return resolve({ ageDays: null });
    }
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
