// src/firebase/functions/autoFlag.js
// Triggered when a new report is added — checks if threshold reached

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { getFirestore }      = require('firebase-admin/firestore');
const { initializeApp }     = require('firebase-admin/app');

initializeApp();
const db = getFirestore();

// Auto-flag scam apps when 3+ reports come in
exports.autoFlagApp = onDocumentCreated('scamAppReports/{docId}', async (event) => {
  const report   = event.data.data();
  const appName  = report.appName?.toLowerCase().trim();
  if (!appName) return;

  const snapshot = await db.collection('scamAppReports')
    .where('appName_lower', '==', appName)
    .get();

  const count = snapshot.size;
  let newStatus = 'reported';
  if (count >= 10) newStatus = 'confirmed_scam';
  else if (count >= 3) newStatus = 'under_review';

  // Update all matching reports
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { status: newStatus, reportCount: count });
  });
  await batch.commit();
});

// Auto-flag spam links when 3+ reports come in
exports.autoFlagLink = onDocumentCreated('spamLinkReports/{docId}', async (event) => {
  const report = event.data.data();
  const domain = report.domain?.toLowerCase().trim();
  if (!domain) return;

  const snapshot = await db.collection('spamLinkReports')
    .where('domain', '==', domain)
    .get();

  const count = snapshot.size;
  let threatLevel = 'reported';
  if (count >= 10) threatLevel = 'confirmed_threat';
  else if (count >= 3) threatLevel = 'likely_phishing';

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.update(doc.ref, { threatLevel, reportCount: count });
  });
  await batch.commit();
});
