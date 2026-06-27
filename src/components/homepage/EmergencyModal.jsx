import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, ShieldAlert, Clock, Landmark, Smartphone, FileSpreadsheet } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function EmergencyModal({ isOpen, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    en: {
      modalTitle: "Emergency Cyber Fraud Help",
      heading: "If you have been a victim of online financial fraud (scam), do not panic. Contact the following number immediately:",
      helplineLabel: "NATIONAL CYBER HELPLINE",
      helplineSub: "Toll-free number (Operated by Govt of India)",
      goldenRule: "💡 Golden Rule: Reporting fraud within the first 24 hours increases the chances of freezing and recovering your lost bank funds significantly!",
      stepsTitle: "Immediate Next Steps:",
      step1Title: "1. Contact Your Bank",
      step1Text: "Immediately block your debit/credit card or net banking through your bank branch, customer care, or mobile app.",
      step2Title: "2. Save Evidence",
      step2Text: "Save screenshots of the scammer's phone numbers, WhatsApp chats, bank transaction SMS, and UPI IDs.",
      step3Title: "3. File Official Online Complaint",
      step3Text: "If you cannot reach Helpline 1930, you can file a complaint with details directly on the Government of India's official portal: ",
      btnClose: "Close",
      btnCallNow: "Call Now (1930)"
    },
    gu: {
      modalTitle: "તાત્કાલિક સાયબર છેતરપિંડી સહાય",
      heading: "જો તમારી સાથે કોઈ ઓનલાઇન નાણાકીય છેતરપિંડી (સ્કેમ) થઈ છે, તો ગભરાશો નહીં. તાત્કાલિક નીચેના નંબર પર સંપર્ક કરો:",
      helplineLabel: "રાષ્ટ્રીય સાયબર હેલ્પલાઇન",
      helplineSub: "ટોલ-ફ્રી નંબર (ભારત સરકાર દ્વારા સંચાલિત)",
      goldenRule: "💡 ગોલ્ડન નિયમ: છેતરપિંડી થયાના પ્રથમ ૨૪ કલાકમાં ફરિયાદ કરવાથી તમારા બેંક એકાઉન્ટમાંથી ગયેલા નાણાં ફ્રીઝ થવાની અને પાછા મળવાની શક્યતા ખુબ વધારે છે!",
      stepsTitle: "આગળના મહત્વના પગલાંઓ:",
      step1Title: "૧. તમારી બેંકનો સંપર્ક કરો",
      step1Text: "તાત્કાલિક તમારી બેંક શાખા, કસ્ટમર કેર અથવા એપ્લિકેશન દ્વારા તમારા ડેબિટ/ક્રેડિટ કાર્ડ અથવા નેટ બેન્કિંગ બ્લોક કરો.",
      step2Title: "૨. પુરાવા સાચવો",
      step2Text: "સ્કેમરના ફોન નંબરો, વોટ્સએપ ચેટ સ્ક્રીનશોટ, બેંક ટ્રાન્ઝેક્શન મેસેજ અને યુપીઆઈ આઈડીનો સ્ક્રીનશોટ લઈ રાખો.",
      step3Title: "૩. સત્તાવાર ઓનલાઇન ફરિયાદ નોંધાવો",
      step3Text: "જો હેલ્પલાઇન ૧૯૩૦ પર સંપર્ક ન થઈ શકે, તો સીધા ભારત સરકારના સત્તાવાર પોર્ટલ પર જઈને વિગતો સાથે ફરિયાદ નોંધી શકો છો: ",
      btnClose: "બંધ કરો",
      btnCallNow: "અત્યારે કૉલ કરો (1930)"
    }
  };

  const tEmerg = content[lang] || content.en;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            id="emergency-backdrop"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-slate-900 text-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 z-10"
            id="emergency-modal-content"
          >
            {/* Header Red Bar */}
            <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
                <h3 className="text-xl font-bold font-sans tracking-wide">{tEmerg.modalTitle}</h3>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
                id="close-emergency-modal-btn"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto text-slate-100">
              <div className="text-center space-y-3">
                <p className="text-slate-300 text-sm sm:text-base md:text-lg">{tEmerg.heading}</p>
                
                {/* Helpline Box */}
                <div className="bg-slate-850 border border-slate-700 rounded-2xl p-6 my-4 inline-block w-full max-w-md shadow-inner">
                  <span className="text-xs tracking-widest text-brand-orange uppercase font-bold block mb-1">{tEmerg.helplineLabel}</span>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <PhoneCall className="w-10 h-10 text-brand-orange animate-bounce" />
                    <span className="text-5xl font-black font-mono tracking-tight text-brand-orange">1930</span>
                  </div>
                  <span className="text-xs text-slate-400 block mt-2">{tEmerg.helplineSub}</span>
                </div>
                
                <p className="text-red-400 font-medium text-sm md:text-base">
                  {tEmerg.goldenRule}
                </p>
              </div>

              {/* Immediate Steps checklist */}
              <div className="border-t border-slate-850 pt-6">
                <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-orange" />
                  {tEmerg.stepsTitle}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step 1 */}
                  <div className="bg-slate-850/50 p-4 rounded-xl border border-slate-800/85 flex gap-3">
                    <div className="bg-brand-orange/10 p-2 h-fit rounded-lg">
                      <Landmark className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">{tEmerg.step1Title}</h5>
                      <p className="text-xs text-slate-400 mt-1">{tEmerg.step1Text}</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-850/50 p-4 rounded-xl border border-slate-800/85 flex gap-3">
                    <div className="bg-brand-orange/10 p-2 h-fit rounded-lg">
                      <Smartphone className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">{tEmerg.step2Title}</h5>
                      <p className="text-xs text-slate-400 mt-1">{tEmerg.step2Text}</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-850/50 p-4 rounded-xl border border-slate-800/85 flex gap-3 md:col-span-2">
                    <div className="bg-brand-orange/10 p-2 h-fit rounded-lg">
                      <FileSpreadsheet className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 text-sm">{tEmerg.step3Title}</h5>
                      <p className="text-xs text-slate-400 mt-1">
                        {tEmerg.step3Text}
                        <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline">cybercrime.gov.in</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-850 justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm cursor-pointer"
                  id="cancel-emergency-btn"
                >
                  {tEmerg.btnClose}
                </button>
                <a
                  href="tel:1930"
                  className="px-6 py-3 bg-brand-orange text-slate-950 rounded-xl hover:bg-brand-orange/90 font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                  id="dial-emergency-btn"
                >
                  <PhoneCall className="w-4 h-4" />
                  {tEmerg.btnCallNow}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
