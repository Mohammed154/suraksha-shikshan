import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, Mail, PhoneForwarded, ChevronDown, ShieldAlert, CheckCircle, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ScamAlertsSection() {
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // Scam checker states
  const [inputText, setInputText] = useState("");
  const [scanResult, setScanResult] = useState({ status: null, matchedTriggers: [], advice: "" });

  const content = {
    en: {
      alertTitle: "Recent Scam Alerts",
      checkerLabelBadge: "New Smart Tech",
      checkerTitle: "Suspicious Message Checker (Scanner)",
      checkerDesc: "If you received an unknown WhatsApp message, lottery notification, or pending bill notice, paste the text below to check if it is a scam.",
      checkerMethodHeader: "💡 How to Check:",
      checkerStep1: "1. Copy the message on your phone.",
      checkerStep2: "2. Paste it in the box on the right and press 'Scan Message'.",
      textareaLabel: "Type or paste message here:",
      textareaPlaceholder: "e.g. You have won a lottery...",
      statusScamTitle: "Warning: High probability of scam!",
      statusCleanTitle: "Risk Analysis Complete",
      trigLabel: "Risk words found in this text:",
      btnScan: "Scan Message",
      btnClear: "Clear",
      emptyInputWarning: "Please write some text in the box first.",
      modusTitle: "Detailed Modus Operandi:",
      safetyTitle: "🛡️ Immediate Safety Actions:",
      scamAdvice: "⚠️ Warning! Scam indicators found in this text. Under no circumstances should you reply, click links, or transfer money.",
      cleanAdvice: "🛡️ No common scam keywords detected. However, cyber scammers discover new methods daily. Never trust anyone asking for money or private credentials."
    },
    gu: {
      alertTitle: "તાજેતરના સ્કેમ એલર્ટ્સ",
      checkerLabelBadge: "નવી સ્માર્ટ ટેકનોલોજી",
      checkerTitle: "શંકાસ્પદ મેસેજ ચેકર (સ્કેનર)",
      checkerDesc: "જો તમને વોટ્સએપ પર કોઈ અજાણ્યો મેસેજ, લોટરી કે બિલ બાકી હોવાની સૂચના મળી હોય, તો તેનું લખાણ નીચેના બોક્સમાં પેસ્ટ કરીને ચેક કરો કે તે છેતરપિંડી છે કે નહીં.",
      checkerMethodHeader: "💡 ચકાસણીની રીત:",
      checkerStep1: "૧. આખા મેસેજને મોબાઇલમાં કોપી કરો.",
      checkerStep2: "૨. જમણી બાજુના બોક્સમાં પેસ્ટ કરો અને 'મેસેજ સ્કેન કરો' બટન દબાવો.",
      textareaLabel: "મેસેજ અહીં લખો અથવા પેસ્ટ કરો:",
      textareaPlaceholder: "દા.ત. તમને લોટરી લાગી છે...",
      statusScamTitle: "સાવધાન: છેતરપિંડી હોવાની ઉચ્ચ શક્યતા!",
      statusCleanTitle: "જોખમ વિશ્લેષણ સફળ",
      trigLabel: "આ લખાણમાં મળેલા જોખમી શબ્દો:",
      btnScan: "મેસેજ સ્કેન કરો",
      btnClear: "સાફ કરો",
      emptyInputWarning: "કૃપા કરીને પહેલા બોક્સમાં ટેક્સ્ટ લખો.",
      modusTitle: "વિગતવાર મોડસ ઓપરેન્ડી:",
      safetyTitle: "🛡️ બચવાના સીધા પગલાંઓ:",
      scamAdvice: "⚠️ સાવચેત રહો! આ મેસેજમાં છેતરપિંડીના જોખમી ચિહ્નો મળ્યા છે. કોઈ પણ સંજોગોમાં આ મેસેજનો વળતો જવાબ ન આપો, કોઈ લિંક ન ખોલો અને કોઈને પણ પૈસા ટ્રાન્સફર ન કરો.",
      cleanAdvice: "🛡️ અમને આ લખાણમાં કોઈ સામાન્ય સ્કેમ વર્ડ્સ મળ્યા નથી. જો કે, સાયબર સ્કેમર્સ રોજ નવા કીવર્ડ્સ શોધે છે. તેથી જો કોઈ અજાણી વ્યક્તિ પૈસા કે ખાનગી માહિતી માંગે, તો વિશ્વાસ ન કરો."
    }
  };

  const tScam = content[lang] || content.en;

  const alertsData = {
    en: [
      {
        id: 1,
        title: "Fake Utility Bill Email",
        desc: "Reports of emails claiming outstanding electricity bills are rising. Do not make payment.",
        date: "June 2026",
        severity: "high",
        type: "email",
        details: "Citizens receive fake emails or SMS stating: 'Your electricity bill is pending and connection will be cut tonight. Call this number to update immediately.' This is just a trick to get bank details through fear.",
        actionSteps: [
          "Do not make calls or verify on any private numbers given in the message.",
          "Find the helpline number on your official bill or visit the nearest power station to know the actual details.",
          "Remember, the electricity company never suddenly pressures you to make a payment over the phone in the middle of the night."
        ]
      },
      {
        id: 2,
        title: "Fraudulent Phone Calls",
        desc: "Scammers pretending to be from your bank. Remember: banks never ask for PIN.",
        date: "June 2026",
        severity: "high",
        type: "phone",
        details: "Scammers present themselves as security officers from SBI, Bank of Baroda, or HDFC. They say your ATM card is locked and ask for the 16-digit number and OTP to unlock it. Once OTP is shared, all money disappears.",
        actionSteps: [
          "The bank never asks for your PIN, OTP, or CVV over the phone.",
          "If someone mentions ATM card lock, hang up immediately.",
          "Contact your official bank manager in person."
        ]
      }
    ],
    gu: [
      {
        id: 1,
        title: "નકલી યુટિલિટી બિલ ઈમેઈલ",
        desc: "વીજળીના બિલ બાકી હોવાનો દાવો કરતા ઈમેઈલના અહેવાલો વધી રહ્યા છે. પેમેન્ટ કરશો નહીં.",
        date: "જૂન ૨૦૨૬",
        severity: "high",
        type: "email",
        details: "નાગરિકોને નકલી ઈમેઈલ અથવા એસએમએસ મળે છે જેમાં જણાવાયું હોય છે કે: 'તમારું વીજળી બિલ બાકી છે અને આજે રાત્રે કનેક્શન કાપી નાખવામાં આવશે. તાત્કાલિક અપડેટ કરવા આ નંબર પર કૉલ કરો'. આ માત્ર ડરાવીને બેંક વિગતો મેળવવાનો પેંતરો છે.",
        actionSteps: [
          "મેસેજમાં આપેલા કોઈપણ ખાનગી નંબરો પર ફોન કે વેરિફિકેશન ન કરો.",
          "તમારા સત્તાવાર બિલ પર આપેલો હેલ્પલાઇન નંબર અથવા નજીકના વીજ મથકે જઈને સાચી વિગત જાણો.",
          "યાદ રાખો, વીજ કંપની ક્યારેય અડધી રાત્રે આ રીતે અચાનક ફોન પર પેમેન્ટ કરવા દબાણ નથી કરતી."
        ]
      },
      {
        id: 2,
        title: "છેતરપિંડી કરનારા ફોન કોલ્સ",
        desc: "તમારી બેંકમાંથી હોવાનો ઢોંગ કરતા સ્કેમર્સ. યાદ રાખો: બેંકો ક્યારેય પિન માંગતી નથી.",
        date: "જૂન ૨૦૨૬",
        severity: "high",
        type: "phone",
        details: "સ્કેમર્સ પોતાને એસબીઆઈ, બેંક ઓફ બરોડા અથવા એચડીએફસીના સુરક્ષા અધિકારી તરીકે રજૂ કરે છે. તેઓ કહેશે કે તમારું એટીએમ કાર્ડ લોક થઈ ગયું છે અને તેને અનલોક કરવા માટે ૧૬ આંકડાનો નંબર અને ઓટીપી જણાવો. એકવાર ઓટીપી આપતાં જ ખાતામાંથી બધા પૈસા ગાયબ થઈ જશે.",
        actionSteps: [
          "બેંક ક્યારેય પણ ફોન પર તમારો પિન (PIN), ઓટીપી (OTP) કે સીવીવી (CVV) નથી પૂછતી.",
          "જો કોઈ આવા કાર્ડ લોકની વાત કરે, તો તાત્કાલિક કૉલ કાપી નાખો.",
          "તમારા સત્તાવાર બેંક મેનેજરનો રૂબરૂ સંપર્ક કરો."
        ]
      }
    ]
  };

  const alerts = alertsData[lang] || alertsData.en;

  const scamDictionaryData = {
    en: [
      { key: "KBC", name: "KBC Lottery Scam" },
      { key: "lottery", name: "Fake Lottery Prize" },
      { key: "prize", name: "Fake Lottery Prize" },
      { key: "win", name: "Fake Lottery Prize" },
      { key: "won", name: "Fake Lottery Prize" },
      { key: "pin", name: "UPI PIN Request" },
      { key: "PIN", name: "UPI PIN Request" },
      { key: "otp", name: "OTP Theft" },
      { key: "OTP", name: "OTP Theft" },
      { key: "cvv", name: "Card CVV Theft" },
      { key: "CVV", name: "Card CVV Theft" },
      { key: "block", name: "Account Block Threat" },
      { key: "lock", name: "Account Block Threat" },
      { key: "part time", name: "Fake Job Offer / Work from Home" },
      { key: "job", name: "Fake Job Offer / Work from Home" },
      { key: "earn", name: "Double Money Lure" },
      { key: "send", name: "Advance Transfer Request" },
      { key: "link", name: "Suspicious Phishing Link" },
      { key: "electricity", name: "Fake Utility Bill Fine" },
      { key: "bill", name: "Fake Utility Bill Fine" }
    ],
    gu: [
      { key: "KBC", name: "KBC લોટરી સ્કેમ" },
      { key: "લોટરી", name: "નકલી લોટરી ઇનામ" },
      { key: "ઇનામ", name: "ઇનામની લાલચ" },
      { key: "પિન", name: "UPI પિનની માંગણી" },
      { key: "PIN", name: "UPI PINની માંગણી" },
      { key: "ઓટીપી", name: "OTP (વન ટાઇમ પાસવર્ડ) ચોરી" },
      { key: "OTP", name: "OTP (વન ટાઇમ પાસવર્ડ) ચોરી" },
      { key: "સીવીવી", name: "કાર્ડ પાછળનો CVV નંબર" },
      { key: "CVV", name: "કાર્ડ પાછળનો CVV નંબર" },
      { key: "બ્લોક", name: "એકાઉન્ટ બંધ કરવાની ધમકી" },
      { key: "block", name: "એકાઉન્ટ બંધ કરવાની ધમકી" },
      { key: "પાર્ટ ટાઇમ", name: "નકલી જોબ ઓફર / વર્ક ફ્રોમ હોમ" },
      { key: "part time", name: "નકલી જોબ ઓફર / વર્ક ફ્રોમ હોમ" },
      { key: "કમાવો", name: "પૈસા ડબલ કરવાની લાલચ" },
      { key: "મોકલો", name: "અગાઉથી પૈસા ટ્રાન્સફર કરવાનું કહેવું" },
      { key: "લિંક", name: "નકલી શંકાસ્પદ લિંક" },
      { key: "link", name: "નકલી શંકાસ્પદ લિંક" },
      { key: "વીજળી", name: "નકલી વીજળી બિલ દંડ" },
      { key: "બિલ", name: "બિલ બાકી હોવાનો દાવો" }
    ]
  };

  const scamDictionary = scamDictionaryData[lang] || scamDictionaryData.en;

  const handleCheckerScan = () => {
    if (!inputText.trim()) {
      setScanResult({ status: null, matchedTriggers: [], advice: tScam.emptyInputWarning });
      return;
    }

    const matched = [];
    const textLower = inputText.toLowerCase();

    scamDictionary.forEach(item => {
      if (textLower.includes(item.key.toLowerCase())) {
        matched.push(item.name);
      }
    });

    if (matched.length > 0) {
      setScanResult({
        status: "scam",
        matchedTriggers: matched,
        advice: tScam.scamAdvice
      });
    } else {
      setScanResult({
        status: "clean",
        matchedTriggers: [],
        advice: tScam.cleanAdvice
      });
    }
  };

  const clearChecker = () => {
    setInputText("");
    setScanResult({ status: null, matchedTriggers: [], advice: "" });
  };

  return (
    <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-200/60" id="alerts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Scam Alerts Board */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#9d4300] p-3 rounded-full flex items-center justify-center shadow-sm">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {tScam.alertTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => {
              const isExpanded = selectedAlertId === alert.id;
              return (
                <div 
                  key={alert.id}
                  className="scam-alert-border bg-slate-50 hover:bg-slate-100/70 p-5 rounded-r-xl transition-all cursor-pointer border border-l-0 border-slate-150"
                  onClick={() => setSelectedAlertId(isExpanded ? null : alert.id)}
                  id={`alert-card-${alert.id}`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      {alert.type === "email" ? (
                        <Mail className="w-8 h-8 text-[#9d4300] shrink-0" />
                      ) : (
                        <PhoneForwarded className="w-8 h-8 text-[#9d4300] shrink-0" />
                      )}
                      <div>
                        <h4 className="font-sans text-base sm:text-lg font-bold text-slate-900">
                          {alert.title}
                        </h4>
                        <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                          {alert.desc}
                        </p>
                      </div>
                    </div>
                    
                    <button className="text-slate-400 group-hover:text-[#9d4300] transition-colors shrink-0">
                      <ChevronDown className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Expansion Area */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 pt-4 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-700"
                        id={`alert-details-${alert.id}`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{tScam.modusTitle}</span>
                          <p className="leading-relaxed text-slate-600">{alert.details}</p>
                        </div>

                        <div className="space-y-2 bg-white p-4 rounded-lg border border-slate-150">
                          <span className="text-xs font-bold text-[#9d4300] flex items-center gap-1">{tScam.safetyTitle}</span>
                          <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                            {alert.actionSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Scam Checker */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id="scam-checker-tool">
          
          <div className="space-y-4">
            <span className="bg-brand-orange/15 text-brand-orange text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              {tScam.checkerLabelBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans">
              {tScam.checkerTitle}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {tScam.checkerDesc}
            </p>
            <div className="bg-slate-880 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
              <span className="font-bold text-slate-300 block">{tScam.checkerMethodHeader}</span>
              <p>{tScam.checkerStep1}</p>
              <p>{tScam.checkerStep2}</p>
            </div>
          </div>

          <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">{tScam.textareaLabel}</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={tScam.textareaPlaceholder}
                className="w-full h-24 p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-150 focus:outline-none focus:border-brand-orange text-sm resize-none"
                id="scam-checker-textarea"
              />
            </div>

            {/* Checker Output panel */}
            <AnimatePresence mode="wait">
              {scanResult.status && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                    scanResult.status === "scam"
                      ? "bg-red-950/40 border-red-800/60 text-red-200"
                      : "bg-emerald-950/40 border-emerald-800/60 text-emerald-200"
                  }`}
                  id="scam-checker-results"
                >
                  <p className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                    {scanResult.status === "scam" ? (
                      <>
                        <ShieldAlert className="w-5 h-5 text-brand-orange animate-pulse" />
                        <span>{tScam.statusScamTitle}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span>{tScam.statusCleanTitle}</span>
                      </>
                    )}
                  </p>
                  <p className="text-slate-300 text-[11px] sm:text-xs mb-2">{scanResult.advice}</p>

                  {scanResult.matchedTriggers.length > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">{tScam.trigLabel}</span>
                      <div className="flex flex-wrap gap-1">
                        {scanResult.matchedTriggers.map((trig, idx) => (
                          <span key={idx} className="bg-red-900/40 text-red-200 border border-red-800 px-2 py-0.5 rounded text-[10px]">
                            🚩 {trig}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleCheckerScan}
                className="flex-1 py-2.5 bg-brand-orange hover:bg-brand-orange/90 text-slate-950 font-bold rounded-lg text-xs sm:text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-1"
                id="scan-msg-btn"
              >
                <Search className="w-4 h-4" />
                {tScam.btnScan}
              </button>
              {inputText && (
                <button
                  onClick={clearChecker}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold rounded-lg text-xs"
                  id="clear-scanner-btn"
                >
                  {tScam.btnClear}
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
