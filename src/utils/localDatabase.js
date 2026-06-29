const APPS_DB_KEY = 'ss_scam_apps';
const LINKS_DB_KEY = 'ss_spam_links';

const DEFAULT_APPS = [
  {
    id: 'app_1',
    appName: 'QuickRupee - Instant Personal Loan',
    appName_lower: 'quickrupee - instant personal loan',
    appUrl: 'https://quickrupeeloan.apk',
    publisher: 'RupeeFast FinTech Ltd',
    scamType: 'fake_loan',
    description: 'લોન આપવાના બહાને પ્રોસેસિંગ ફી માટે ₹2,000 માંગે છે અને મોબાઈલ કોન્ટેક્ટ લીસ્ટ મેળવી બ્લેકમેલ કરે છે. (Demands ₹2,000 upfront processing fees for loan and accesses contacts to blackmail.)',
    status: 'confirmed_scam',
    reportCount: 18,
    reportedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'app_2',
    appName: 'EarnMoney Daily Task App',
    appName_lower: 'earnmoney daily task app',
    appUrl: 'https://earnmoney-daily.web.app',
    publisher: 'TaskEarn Creator',
    scamType: 'fake_jobs',
    description: 'યુટ્યુબ વિડીયો લાઈક કરવા માટે રોજ ₹500 આપવાનો દાવો કરે છે. સિક્યોરિટી ડિપોઝીટ તરીકે ₹5,000 ભરાવીને એકાઉન્ટ બ્લોક કરી દે છે. (Promises ₹500/day for liking YouTube videos. Demands security deposit of ₹5,000 and then locks the account.)',
    status: 'confirmed_scam',
    reportCount: 15,
    reportedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'app_3',
    appName: 'Sarkari Yojana Help',
    appName_lower: 'sarkari yojana help',
    appUrl: 'http://sarkari-yojna-apply.info',
    publisher: 'Unknown',
    scamType: 'fake_yojana',
    description: 'પીએમ કિસાન યોજના (PM Kisan Yojana) ના નામે આધાર કાર્ડ અને પાન કાર્ડની વિગતો ચોરી કરે છે. ફોર્મ ભરવાના ખોટા ચાર્જ વસૂલે છે. (Steals Aadhaar and PAN card details for fake government scheme application. Charges form submission fees.)',
    status: 'under_review',
    reportCount: 5,
    reportedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'app_4',
    appName: 'FastUPI Cash Rewards',
    appName_lower: 'fastupi cash rewards',
    appUrl: 'https://fastupi-rewards.apk',
    publisher: 'UPI Cashback Team',
    scamType: 'upi_request',
    description: '₹2,000 કેશબેક જીત્યા હોવાનો દાવો કરે છે, પરંતુ લીંક પર ક્લિક કરતા યુપીઆઈ રીકવેસ્ટ મોકલે છે અને પૈસા મેળવવાના બદલે કપાઈ જાય છે. (Claims to send ₹2,000 cashback, but triggers a UPI request asking to enter UPI PIN which debits money instead.)',
    status: 'reported',
    reportCount: 2,
    reportedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  }
];

const DEFAULT_LINKS = [
  {
    id: 'link_1',
    url: 'https://t.me/free_crypto_india_daily_loot',
    domain: 't.me',
    platform: 'telegram',
    scamCategory: 'investment',
    description: '૨ કલાકમાં ડબલ પૈસા કરવાની લાલચ આપતી ટેલિગ્રામ ચેનલ. યુપીઆઈ આઈડી પર પૈસા મોકલવા દબાણ કરે છે. (Telegram channel promising 200% returns in 2 hours. Asks to send money to a UPI ID.)',
    threatLevel: 'confirmed_threat',
    reportCount: 14,
    reportedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 'link_2',
    url: 'https://lucky-draw-rewards.com/win',
    domain: 'lucky-draw-rewards.com',
    platform: 'whatsapp',
    scamCategory: 'lottery',
    description: 'કેબીસી લોટરી (KBC Lottery) માં ₹25 લાખ જીત્યા હોવાનો મેસેજ. લોટરીની રકમ ટ્રાન્સફર કરવા માટે ₹25,000 ટેક્સ ચાર્જ માંગે છે. (KBC Lottery message claiming ₹25 Lakh win. Demands ₹25,000 transfer tax fee.)',
    threatLevel: 'confirmed_threat',
    reportCount: 12,
    reportedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'link_3',
    url: 'https://speedy-verification-kyc.info',
    domain: 'speedy-verification-kyc.info',
    platform: 'sms',
    scamCategory: 'phishing',
    description: 'વીજળી બિલ બાકી હોવાથી કનેક્શન કાપી નાખવાનો મેસેજ. કેવાયસી અપડેટ કરવા માટે નકલી લીંક આપેલ છે. (SMS alerting that electricity connection will be cut tonight due to pending bill. Asks to update KYC immediately via fake link.)',
    threatLevel: 'likely_phishing',
    reportCount: 4,
    reportedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'link_4',
    url: 'https://part-time-work-home.online',
    domain: 'part-time-work-home.online',
    platform: 'whatsapp',
    scamCategory: 'fake_jobs',
    description: 'વોટ્સએપ પર ઘેર બેઠા પાર્ટ-ટાઈમ નોકરી ઓફર કરતો મેસેજ. વેબસાઈટ પર સાઈન-અપ કરાવી ખોટી સિક્યોરિટી રકમ માંગે છે. (WhatsApp message offering flexible part-time work from home. Requires sign-up on untrusted website and deposit fee.)',
    threatLevel: 'reported',
    reportCount: 1,
    reportedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  }
];

// Initialize local database if empty
function ensureDBInitialized() {
  if (!localStorage.getItem(APPS_DB_KEY)) {
    localStorage.setItem(APPS_DB_KEY, JSON.stringify(DEFAULT_APPS));
  }
  if (!localStorage.getItem(LINKS_DB_KEY)) {
    localStorage.setItem(LINKS_DB_KEY, JSON.stringify(DEFAULT_LINKS));
  }
}

export function getScamApps() {
  ensureDBInitialized();
  const list = JSON.parse(localStorage.getItem(APPS_DB_KEY));
  // sort by reportCount desc
  return list.sort((a, b) => b.reportCount - a.reportCount);
}

export function getSpamLinks() {
  ensureDBInitialized();
  const list = JSON.parse(localStorage.getItem(LINKS_DB_KEY));
  // sort by reportCount desc
  return list.sort((a, b) => b.reportCount - a.reportCount);
}

export function reportScamApp(appData) {
  ensureDBInitialized();
  const list = JSON.parse(localStorage.getItem(APPS_DB_KEY));
  const appNameLower = appData.appName.trim().toLowerCase();

  // Find all existing records with the same lowercase appName
  const matches = list.filter(item => item.appName_lower === appNameLower);
  const count = matches.length + 1;

  let newStatus = 'reported';
  if (count >= 10) newStatus = 'confirmed_scam';
  else if (count >= 3) newStatus = 'under_review';

  // Update existing matching items status and count
  list.forEach(item => {
    if (item.appName_lower === appNameLower) {
      item.status = newStatus;
      item.reportCount = count;
    }
  });

  // Create new record
  const newRecord = {
    id: 'app_' + Math.random().toString(36).slice(2) + Date.now(),
    appName: appData.appName.trim(),
    appName_lower: appNameLower,
    appUrl: (appData.appUrl || '').trim(),
    publisher: (appData.publisher || '').trim(),
    scamType: appData.scamType,
    description: appData.description.trim(),
    status: newStatus,
    reportCount: count,
    reportedAt: new Date().toISOString(),
  };

  list.push(newRecord);
  localStorage.setItem(APPS_DB_KEY, JSON.stringify(list));
  return newRecord;
}

export function reportSpamLink(linkData) {
  ensureDBInitialized();
  const list = JSON.parse(localStorage.getItem(LINKS_DB_KEY));

  let domain = '';
  try {
    domain = new URL(linkData.url).hostname.replace('www.', '');
  } catch {
    domain = linkData.url.replace('www.', '');
  }
  const domainLower = domain.toLowerCase().trim();

  // Find all existing records with the same domain
  const matches = list.filter(item => item.domain === domainLower);
  const count = matches.length + 1;

  let threatLevel = 'reported';
  if (count >= 10) threatLevel = 'confirmed_threat';
  else if (count >= 3) threatLevel = 'likely_phishing';

  // Update existing items
  list.forEach(item => {
    if (item.domain === domainLower) {
      item.threatLevel = threatLevel;
      item.reportCount = count;
    }
  });

  // Create new record
  const newRecord = {
    id: 'link_' + Math.random().toString(36).slice(2) + Date.now(),
    url: linkData.url.trim(),
    domain: domainLower,
    platform: linkData.platform,
    scamCategory: linkData.scamCategory,
    description: linkData.description.trim(),
    threatLevel: threatLevel,
    reportCount: count,
    reportedAt: new Date().toISOString(),
  };

  list.push(newRecord);
  localStorage.setItem(LINKS_DB_KEY, JSON.stringify(list));
  return newRecord;
}
