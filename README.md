# સુરક્ષા શિક્ષણ — Suraksha Shikshan

> Digital Safety Tutorial Platform for Senior Citizens, Rural & First-Time Internet Users

A bilingual (Gujarati + English) PWA that teaches scam recognition through story-driven lessons, voice narration, a live link checker, and a community scam-reporting database.

---

## 🚀 Quick Start (VS Code)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# → Fill in your Firebase credentials in .env

# 3. Start development server
npm run dev
# → Opens at http://localhost:5173
```

## 📁 Project Structure

```
suraksha-shikshan/
├── public/
│   └── icons/              ← PWA icons
├── src/
│   ├── components/         ← Reusable UI components
│   │   ├── LessonPanel.jsx     Comic-strip lesson template
│   │   ├── QuizCard.jsx        Picture-based MCQ
│   │   ├── LinkChecker.jsx     URL safety checker
│   │   ├── ReportForm.jsx      Scam app/link reporter
│   │   ├── EmergencyHelp.jsx   "I got scammed" screen
│   │   ├── BadgeModal.jsx      Badge earned animation
│   │   ├── BottomNav.jsx       4-tab navigation bar
│   │   └── VoiceButton.jsx     Text-to-speech toggle
│   ├── screens/            ← Route-level screens
│   │   ├── Home.jsx
│   │   ├── LessonList.jsx
│   │   ├── Lesson.jsx
│   │   ├── LinkCheck.jsx
│   │   ├── Report.jsx
│   │   ├── ScamDatabase.jsx
│   │   └── Emergency.jsx
│   ├── content/
│   │   ├── lessons/        ← 6 JSON lesson files (Gujarati + English)
│   │   └── alerts/         ← Weekly scam alerts JSON
│   ├── firebase/
│   │   ├── config.js       ← Firebase init
│   │   └── functions/      ← Cloud Functions (link checker, auto-flag)
│   ├── i18n/               ← Translation strings
│   │   ├── gu.json         Gujarati UI strings
│   │   └── en.json         English UI strings
│   ├── hooks/
│   │   ├── useSpeech.js    Web Speech API wrapper
│   │   └── useProgress.js  Lesson progress (Firestore)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example            ← Copy to .env and fill credentials
├── firebase.json
├── vite.config.js
└── package.json
```

## 🔧 Firebase Database Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable **Firestore Database** and **Authentication** (enable **Anonymous** provider)
3. Copy your project config into `.env` (refer to `.env.example`)

## 📱 Features

| Feature | Status |
|---------|--------|
| 6 Bilingual Safety Lessons (Gujarati + English) | ✅ Ready |
| Voice Narration (Web Speech API) | ✅ Ready |
| Picture-based Quiz with Badges | ✅ Ready |
| Live Link Safety Checker | ✅ Ready |
| Scam App Reporter | ✅ Ready |
| Spam Link Reporter + Hall of Shame | ✅ Ready |
| Emergency "I Got Scammed" Screen | ✅ Ready |
| PWA (installable, works offline) | ✅ Ready |
| Cybercrime.gov.in Complaint Export | ✅ Ready |

## 🎯 Target Audience

- Senior citizens (60–80 yrs) — WhatsApp daily users
- Rural first-time smartphone users
- Semi-literate homemakers managing UPI
- School-dropout youth targeted by fake job scams

## 🌐 Deployment to Vercel

The project is configured for Vercel deployment, including Vercel Serverless Functions for API routes.

### 1. Local Development
```bash
npm run dev
```

### 2. Vercel Environment Variables
Configure the following environment variables in your Vercel project settings:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `SAFE_BROWSING_API_KEY`
- `WHOIS_API_KEY`

### 3. Deploy
Deploy using the Vercel CLI or import the repository in your Vercel dashboard:
```bash
# Deploy to Vercel
vercel --prod
```

## 📋 Internship Day Plan

| Days | Focus |
|------|-------|
| 1–2  | Research + survey + lesson content writing |
| 3–4  | Figma design + user testing |
| 5–6  | Build core app + all 6 lessons |
| 7–8  | Link checker + scam reporters |
| 9    | Emergency screen + PWA |
| 10   | Pilot test with real users |
| 11   | Fix + polish + print QR posters |
| 12   | Demo + submit internship report |

---

*Suraksha Shikshan • College Societal Internship Program • June 2026*
