import { useState } from "react";
import { PhoneCall, Heart, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/homepage/Navbar";
import Hero from "../components/homepage/Hero";
import LessonsSection from "../components/homepage/LessonsSection";
import ScamAlertsSection from "../components/homepage/ScamAlertsSection";
import HelpCenterSection from "../components/homepage/HelpCenterSection";
import EmergencyModal from "../components/homepage/EmergencyModal";

export default function Landing() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // States for Footer interactive elements
  const [footerModalType, setFooterModalType] = useState(null);

  const handleLessonSelect = (id) => {
    navigate(`/lessons/${id}`);
  };

  const handleStartLearning = () => {
    setActiveTab("lessons");
    const element = document.getElementById("lessons-section");
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const content = {
    en: {
      brandSubtext: "Safe Digital India",
      footerDesc: "© 2026 SafeDigital - Empowering elders and rural citizens to stay safe online.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      accessibilityStatement: "Accessibility Statement",
      loveTag1: "Made with love ",
      loveTag2: " for the safety of elders.",
      gotItBtn: "I Understand",
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Service",
      accessibilityTitle: "Accessibility Statement",
      privacyContent1: "SafeDigital platform does not save or record any of your private details, password, or bank account information.",
      privacyContent2: "The password tester game and other quizzes run completely on your phone's local memory. We prioritize user privacy first.",
      termsContent1: "This website is created solely for the purpose of raising cyber safety awareness and educating elders.",
      termsContent2: "We do not represent any bank, organization, or police department. In case of any serious fraud, please contact the official cyber cell (1930) directly.",
      accessibilityContent1: "We have made this website extremely simple, using large text and clean language, optimized for elders and rural citizens with weak eyesight.",
      accessibilityContent2: "Screen reader compatibility and dark color contrast settings have been carefully implemented.",
      calloutTitle: "Need Urgent Help?",
      calloutDesc: "If you feel you have been a victim of a scam, do not wait. Our experts are here 24/7 to guide you through next steps.",
      calloutBtn: "Emergency Call"
    },
    gu: {
      brandSubtext: "સલામત ડિજિટલ ભારત",
      footerDesc: "© 2026 SafeDigital - વડીલો અને ગ્રામીણ નાગરિકોને ઓનલાઇન સુરક્ષિત રહેવા માટે સશક્ત બનાવવું.",
      privacyPolicy: "ગોપનીયતા નીતિ",
      termsOfService: "સેવાની શરતો",
      accessibilityStatement: "ઍક્સેસિબિલિટી સ્ટેટમેન્ટ",
      loveTag1: "બનાવવામાં આવ્યું છે સ્નેહ સાથે ",
      loveTag2: " વડીલોની સુરક્ષા માટે.",
      gotItBtn: "સમજાઈ ગયું",
      privacyTitle: "ગોપનીયતા નીતિ (Privacy Policy)",
      termsTitle: "સેવાની શરતો (Terms of Service)",
      accessibilityTitle: "ઍક્સેસિબિલિટી સ્ટેટમેન્ટ (Accessibility)",
      privacyContent1: "SafeDigital પ્લેટફોર્મ તમારી કોઈપણ ગુપ્ત વિગતો, પાસવર્ડ અથવા બેંક એકાઉન્ટ માહિતી સેવ કે રેકોર્ડ કરતું નથી.",
      privacyContent2: "પાસવર્ડ ટેસ્ટર રમત અને અન્ય ક્વિઝ સંપૂર્ણપણે તમારા ફોનની લોકલ મેમરી પર ચાલે છે. અમે યુઝર પ્રાઈવસીને પ્રથમ પ્રાધાન્ય આપીએ છીએ.",
      termsContent1: "આ વેબસાઈટ માત્ર સાયબર સુરક્ષા અંગે લોક જાગૃતિ અને વડીલોને શિક્ષિત કરવાના ઉદ્દેશથી બનાવવામાં આવી છે.",
      termsContent2: "અમે કોઈપણ બેંક, સંસ્થા અથવા પોલીસ વિભાગના પ્રતિનિધિ નથી. કોઈપણ ગંભીર છેતરપિંડીના સંજોગોમાં સત્તાવાર સાયબર સેલ (૧૯૩૦) નો જ સંપર્ક કરો.",
      accessibilityContent1: "અમે આ વેબસાઈટને વડીલો અને આંખની નબળાઈ ધરાવતા ગ્રામીણ નાગરિકો માટે અત્યંત સરળ, મોટા અક્ષરો અને શુદ્ધ ગુજરાતી ભાષામાં બનાવી છે.",
      accessibilityContent2: "સ્ક્રીન રીડર સુસંગત અને ડાર્ક કલર કોન્ટ્રાસ્ટ સેટિંગ્સનું ધ્યાન રાખવામાં આવ્યું છે.",
      calloutTitle: "તાત્કાલિક મદદની જરૂર છે?",
      calloutDesc: "જો તમને લાગે કે તમે કોઈ કૌભાંડનો ભોગ બન્યા છો, તો રાહ ન જુઓ. અમારા નિષ્ણાતો તમને ૨૪/૭ આગળના પગલાંઓ માટે માર્ગદર્શન આપવા માટે અહીં હાજર છે.",
      calloutBtn: "ઇમરજન્સી કોલ"
    }
  };

  const tLand = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-slate-900 font-sans antialiased flex flex-col justify-between w-full">
      
      {/* 1. Portal Header Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onEmergencyClick={() => setIsEmergencyOpen(true)} 
      />

      {/* Main Layout offset by fixed header height (h-20) */}
      <main className="pt-20 flex-grow w-full">
        
        {/* 2. Hero Interactive Welcome Banner */}
        <Hero onStartLearningClick={handleStartLearning} />

        {/* 3. Safety Lessons Section */}
        <div id="lessons-section">
          <LessonsSection onLessonSelect={handleLessonSelect} />
        </div>

        {/* 4. Scam Alerts & Scanner Board */}
        <div id="alerts-section">
          <ScamAlertsSection />
        </div>

        {/* 5. Help Q&A Section */}
        <div id="help-section">
          <HelpCenterSection />
        </div>

        {/* 6. Emergency Orange Alert Callout Box */}
        <section className="py-12 bg-slate-50 border-t border-slate-100 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-[#131b2e] text-white p-6 sm:p-10 md:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left shadow-xl border border-slate-800">
              
              <div className="space-y-3 max-w-2xl">
                <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-black text-[#bec6e0] leading-tight">
                  {tLand.calloutTitle}
                </h2>
                <p className="font-sans text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
                  {tLand.calloutDesc}
                </p>
              </div>

              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="h-16 px-10 bg-[#fd761a] hover:bg-[#ff8c3a] text-slate-950 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3.5 hover:scale-103 transition-all active:scale-97 shadow-lg cursor-pointer select-none shrink-0"
                id="footer-emergency-trigger-btn"
              >
                <PhoneCall className="w-6 h-6 animate-pulse" />
                {tLand.calloutBtn}
              </button>

            </div>
          </div>
        </section>

      </main>

      {/* 7. Footer Bar with Legal overlays */}
      <footer className="bg-slate-100 border-t border-slate-200 py-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          
          <div className="space-y-2">
            <div className="font-sans text-lg font-black text-slate-800 tracking-tight flex items-center justify-center md:justify-start gap-1.5">
              <span>SafeDigital</span>
              <span className="text-xs bg-brand-orange/15 text-brand-orange-dark px-2 py-0.5 rounded-full font-bold">{tLand.brandSubtext}</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm">
              {tLand.footerDesc}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-600">
            <button 
              onClick={() => setFooterModalType("privacy")} 
              className="hover:text-brand-orange-dark hover:underline transition-colors cursor-pointer"
            >
              {tLand.privacyPolicy}
            </button>
            <button 
              onClick={() => setFooterModalType("terms")} 
              className="hover:text-brand-orange-dark hover:underline transition-colors cursor-pointer"
            >
              {tLand.termsOfService}
            </button>
            <button 
              onClick={() => setFooterModalType("accessibility")} 
              className="hover:text-brand-orange-dark hover:underline transition-colors cursor-pointer"
            >
              {tLand.accessibilityStatement}
            </button>
          </div>

        </div>

        {/* Small details line */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mt-6 border-t border-slate-200/50 flex justify-center items-center text-[10px] text-slate-400 gap-1">
          <span>{tLand.loveTag1}</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>{tLand.loveTag2}</span>
        </div>
      </footer>

      {/* =======================================
          MODAL OVERLAYS & CONTROLLERS
         ======================================= */}
      
      {/* A. Cyber crime 1930 Emergency Helpline Drawer */}
      <EmergencyModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
      />

      {/* C. Legal Overlays (Simulated for high-fidelity compliance) */}
      <AnimatePresence>
        {footerModalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setFooterModalType(null)} 
              className="fixed inset-0 bg-black/50 backdrop-blur-xs" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 z-10 text-slate-900"
            >
              <button 
                onClick={() => setFooterModalType(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50"
              >
                <XButton />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Info className="w-6 h-6 text-brand-orange-dark" />
                  <h4 className="text-lg font-bold text-[#131b2e]">
                    {footerModalType === "privacy" && tLand.privacyTitle}
                    {footerModalType === "terms" && tLand.termsTitle}
                    {footerModalType === "accessibility" && tLand.accessibilityTitle}
                  </h4>
                </div>

                <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {footerModalType === "privacy" && (
                    <>
                      <p>{tLand.privacyContent1}</p>
                      <p>{tLand.privacyContent2}</p>
                    </>
                  )}
                  {footerModalType === "terms" && (
                    <>
                      <p>{tLand.termsContent1}</p>
                      <p>{tLand.termsContent2}</p>
                    </>
                  )}
                  {footerModalType === "accessibility" && (
                    <>
                      <p>{tLand.accessibilityContent1}</p>
                      <p>{tLand.accessibilityContent2}</p>
                    </>
                  )}
                </div>

                <button 
                  onClick={() => setFooterModalType(null)}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  {tLand.gotItBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Simple internal helper SVG close button
function XButton() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );
}
