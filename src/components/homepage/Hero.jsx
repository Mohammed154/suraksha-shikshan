import { motion } from "framer-motion";
import { ShieldAlert, BookOpen, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero({ onStartLearningClick }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    en: {
      campaign: "🚩 Safety Campaign 2026",
      title: "Stay Safe Online with Confidence",
      description: "Empowering you with simple, clear steps to protect yourself and your family from digital scams.",
      btnStart: "Start Learning",
      btnScams: "Beware of Recent Scams",
      badgeTitle: "100% Trusted",
      badgeSub: "Community Support & Guidance",
      imgAlt: "An elderly woman using a tablet and a young man helping her"
    },
    gu: {
      campaign: "🚩 સુરક્ષા અભિયાન ૨૦૨૬",
      title: "વિશ્વાસ સાથે ઓનલાઇન સુરક્ષિત રહો",
      description: "ડિજિટલ કૌભાંડોથી તમારી જાતને અને તમારા પરિવારને બચાવવા માટે તમને સરળ, સ્પષ્ટ પગલાંઓ સાથે સશક્ત બનાવવું.",
      btnStart: "શીખવાનું શરૂ કરો",
      btnScams: "તાજેતરના સ્કેમથી ચેતો",
      badgeTitle: "100% વિશ્વસનીય",
      badgeSub: "સમુદાય સહાય અને માર્ગદર્શન",
      imgAlt: "એક વૃદ્ધ મહિલા ટેબ્લેટ વાપરી રહી છે અને એક યુવાન તેને મદદ કરી રહ્યો છે"
    }
  };

  const tHero = content[lang] || content.en;

  return (
    <section className="bg-slate-50 py-12 md:py-16 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        
        {/* Left Side: Call to Action */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 md:space-y-8"
          id="hero-cta-column"
        >
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 text-brand-orange-dark rounded-full text-xs font-bold uppercase tracking-wider">
              {tHero.campaign}
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {tHero.title}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg">
              {tHero.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onStartLearningClick}
              className="h-14 px-8 bg-black hover:bg-slate-800 text-white rounded-lg font-bold text-base sm:text-lg hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              id="hero-start-btn"
            >
              <BookOpen className="w-5 h-5 text-brand-orange" />
              {tHero.btnStart}
            </button>
            
            <a
              href="#alerts-section"
              className="h-14 px-6 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-1 transition-all"
              id="hero-secondary-btn"
            >
              {tHero.btnScams}
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Showcase Image & Badges */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative group"
          id="hero-media-column"
        >
          {/* Main Showcase Image Wrapper */}
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 border border-slate-200 bg-white">
            <img 
              alt={tHero.imgAlt} 
              className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500" 
              src="/indian_villager_mobile.png"
            />
          </div>

          {/* Floating Orange Stamp Card (Matches design exactly) */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute -bottom-5 -left-5 bg-[#fd761a] text-white p-5 rounded-xl shadow-lg hidden md:block max-w-[240px] border border-orange-500/30"
            id="hero-floating-badge"
          >
            <div className="flex items-start gap-3">
              <div className="bg-white/15 p-2 rounded-lg shrink-0">
                <ShieldAlert className="w-8 h-8 text-white fill-white" />
              </div>
              <div>
                <p className="font-bold text-base leading-tight text-white">{tHero.badgeTitle}</p>
                <p className="text-xs text-orange-50/90 font-medium mt-0.5">{tHero.badgeSub}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
