import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Search, ChevronDown, ShieldCheck, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HelpCenterSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState("all");
  const [openFaqId, setOpenFaqId] = useState(null);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const content = {
    en: {
      title: "Help Center (FAQ)",
      subtitle: "Simple answers to key questions frequently asked by elders to stay safe in the digital world.",
      topicsLabel: "Select Topics:",
      searchLabel: "Search specific detail:",
      searchPlaceholder: "Type keyword (e.g. OTP)...",
      emptyState: "No questions found for the searched keyword. Please select another question or topic.",
      categoryPrefix: "Category: ",
      verifiedBadge: "🛡️ Approved by SafeDigital",
      govTitle: "Official Cyber Security Site of Govt of India",
      govDesc: "Report any online fraud activity or cybercrime directly on the official national portal.",
      govBtn: "Visit Site",
      categories: {
        all: "All",
        immediate: "Immediate Actions",
        bank: "Bank & Security",
        phone: "Phone & WhatsApp"
      }
    },
    gu: {
      title: "સહાય કેન્દ્ર (પ્રશ્નોત્તરી)",
      subtitle: "ડિજિટલ દુનિયામાં સુરક્ષિત રહેવા માટે વડીલો દ્વારા વારંવાર પૂછાતા મહત્વના પ્રશ્નોના સરળ જવાબો.",
      topicsLabel: "વિષયો પસંદ કરો:",
      searchLabel: "ચોક્કસ વિગત શોધો:",
      searchPlaceholder: "કીવર્ડ ટાઈપ કરો (દા.ત. OTP)...",
      emptyState: "શોધાયેલા કીવર્ડ માટે કોઈ પ્રશ્ન મળ્યો નથી. કૃપા કરીને અન્ય સવાલ અથવા વિષય પસંદ કરો.",
      categoryPrefix: "શ્રેણી: ",
      verifiedBadge: "🛡️ SafeDigital દ્વારા માન્ય",
      govTitle: "ભારત સરકારની સત્તાવાર સાયબર સુરક્ષા સાઇટ",
      govDesc: "કોઈપણ ઓનલાઇન અકુદરતી પ્રવૃત્તિ અથવા ગુના અંગે સત્તાવાર રાષ્ટ્રીય પોર્ટલ પર સીધી ફરિયાદ નોંધાવો.",
      govBtn: "સાઇટની મુલાકાત લો",
      categories: {
        all: "બધા",
        immediate: "તાત્કાલિક પગલાં",
        bank: "બેંક અને સુરક્ષા",
        phone: "ફોન અને વોટ્સએપ"
      }
    }
  };

  const tHelp = content[lang] || content.en;

  const faqsData = {
    en: [
      {
        id: 1,
        categoryKey: "immediate",
        category: "Immediate Actions",
        question: "If I accidentally transferred money to a scammer online, what is the first thing I should do?",
        answer: "Contact the Government of India Cyber Helpline 1930 immediately (within the first 24 hours) or file a complaint on the cybercrime.gov.in portal. Simultaneously, call or visit your bank branch to report the fraud so the transferred funds can be frozen in the scammer's account."
      },
      {
        id: 2,
        categoryKey: "bank",
        category: "Bank & Security",
        question: "Can a bank officer ask for my OTP or Card PIN over the phone under any circumstances?",
        answer: "No, never! No bank employee, manager, or RBI official will ever ask for your OTP, ATM PIN, UPI PIN, or password over the phone or in a message. Anyone asking for this information is 100% a fraudster. Do not share these details with anyone."
      },
      {
        id: 3,
        categoryKey: "phone",
        category: "Phone & WhatsApp",
        question: "What to do if I receive a call or lottery message from a foreign number (+92 or +254) on WhatsApp?",
        answer: "Ignore any voice/video calls or lottery messages from unknown international or suspicious local numbers. Immediately block and report the number on WhatsApp. Never click on unknown links."
      },
      {
        id: 4,
        categoryKey: "phone",
        category: "Phone & WhatsApp",
        question: "How do I know if my phone is hacked?",
        answer: "If your phone suddenly gets very hot, the battery drains rapidly, internet data usage spikes abnormally, or strange ads/new apps appear on your screen on their own, your phone might be hacked. To resolve this, take it to customer care immediately and do a factory reset."
      },
      {
        id: 5,
        categoryKey: "bank",
        category: "Bank & Security",
        question: "Do I need to enter a UPI PIN to receive money?",
        answer: "No! This is the biggest and most common scam. Remember, you never need to enter or scan a PIN to receive money in your account. A UPI PIN is only entered when sending money to someone or checking your balance."
      }
    ],
    gu: [
      {
        id: 1,
        categoryKey: "immediate",
        category: "તાત્કાલિક પગલાં",
        question: "જો મેં સ્કેમરને ભૂલથી ઓનલાઇન પૈસા ટ્રાન્સફર કરી દીધા હોય, તો મારે સૌથી પહેલાં શું કરવું?",
        answer: "તાત્કાલિક (પ્રથમ ૨૪ કલાકમાં) ભારત સરકારની સાયબર હેલ્પલાઇન ૧૯૩૦ પર સંપર્ક કરો અથવા cybercrime.gov.in પોર્ટલ પર ફરિયાદ નોંધાવો. આ સાથે જ તમારી બેંક શાખાને ફોન કરી અથવા રૂબરૂ જઈને છેતરપિંડીની જાણ કરો, જેથી ટ્રાન્સફર થયેલા નાણાં સ્કેમરના ખાતામાંથી ફ્રીઝ (રોકી) કરાવી શકાય."
      },
      {
        id: 2,
        categoryKey: "bank",
        category: "બેંક અને સુરક્ષા",
        question: "શું કોઈ પણ સંજોગોમાં બેંક ઓફિસર ફોન પર મારો ઓટીપી (OTP) કે કાર્ડ પિન (PIN) માંગી શકે?",
        answer: "ના, ક્યારેય નહીં! સત્તાવાર બેંકનો કોઈ પણ કર્મચારી, મેનેજર કે આરબીઆઈના અધિકારી ક્યારેય ફોન પર કે મેસેજમાં તમારી પાસે ઓટીપી, એટીએમ પિન, યુપીઆઈ પિન કે પાસવર્ડ નથી માંગતા. જે પણ વ્યક્તિ આવી માહિતી માંગે છે તે ૧૦૦% છેતરપિંડી કરનાર જ છે. કોઈને આ વિગતો શેર કરશો નહીં."
      },
      {
        id: 3,
        categoryKey: "phone",
        category: "ફોન અને વોટ્સએપ",
        question: "મારા વોટ્સએપ પર લોટરી અથવા વિદેશી નંબર (+૯૨ કે +૨૫૪) પરથી કૉલ આવે તો શું કરવું?",
        answer: "આવા કોઈપણ અજાણ્યા આંતરરાષ્ટ્રીય અથવા શંકાસ્પદ સ્થાનિક નંબર પરથી આવતા ઓડિયો/વીડિયો કૉલ કે લોટરીના લખાણને અવગણો. તે નંબરને વોટ્સએપમાં તાત્કાલિક 'બ્લોક' (Block) અને 'રિપોર્ટ' (Report) કરો. અજાણી લિંક્સ પર ક્યારેય ક્લિક કરશો નહીં."
      },
      {
        id: 4,
        categoryKey: "phone",
        category: "ફોન અને વોટ્સએપ",
        question: "મારો ફોન હેક થયો છે કે કેમ તે મને કેવી રીતે ખબર પડે?",
        answer: "જો તમારો ફોન અચાનક ખુબ ગરમ થઈ જતો હોય, બેટરી ઝડપથી ઉતરી જતી હોય, ઈન્ટરનેટ ડેટા અસાધારણ રીતે વપરાઈ જતો હોય અથવા તમારા સ્ક્રીન પર આપમેળે અજીબ જાહેરાતો કે નવી એપ્લિકેશન્સ દેખાવા લાગે, તો તમારો ફોન હેક હોઈ શકે છે. આના નિકાલ માટે ફોનને તાત્કાલિક કસ્ટમર કેર પર લઈ જઈ ફેક્ટરી રીસેટ કરાવો."
      },
      {
        id: 5,
        categoryKey: "bank",
        category: "બેંક અને સુરક્ષા",
        question: "નાણાં પ્રાપ્ત કરવા માટે (પૈસા મેળવવા માટે) શું યુપીઆઈ પિન (UPI PIN) દાખલ કરવો પડે?",
        answer: "ના! આ સૌથી મોટું અને સામાન્ય કૌભાંડ છે. યાદ રાખો કે પૈસા તમારા ખાતામાં મેળવવા માટે ક્યારેય પણ તમારે કોઈ પિન ટાઇપ કરવાની કે સ્કેન કરવાની જરૂર નથી હોતી. યુપીઆઈ પિન માત્ર ત્યારે જ દાખલ કરવો પડે છે જ્યારે તમે કોઈને પૈસા 'મોકલી' રહ્યા હોવ અથવા બેલેન્સ ચેક કરી રહ્યા હોવ."
      }
    ]
  };

  const faqs = faqsData[lang] || faqsData.en;
  const categoriesList = ["all", "immediate", "bank", "phone"];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategoryKey === "all" || faq.categoryKey === selectedCategoryKey;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 md:py-16 bg-white border-b border-slate-100" id="help-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-3">
          <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <HelpCircle className="w-8 h-8 text-brand-orange-dark shrink-0" />
            {tHelp.title}
          </h2>
          <p className="font-sans text-slate-500 text-sm sm:text-base leading-relaxed">
            {tHelp.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Filters and Search column */}
          <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/70 shadow-inner">
            <h4 className="font-bold text-slate-800 text-sm sm:text-base">{tHelp.topicsLabel}</h4>
            
            {/* Category tabs vertical */}
            <div className="flex flex-row flex-wrap lg:flex-col gap-2">
              {categoriesList.map((catKey, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategoryKey(catKey);
                    setOpenFaqId(null);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-left font-semibold text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedCategoryKey === catKey
                      ? "bg-brand-navy text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-150 hover:bg-slate-100"
                  }`}
                  id={`faq-cat-${idx}`}
                >
                  {tHelp.categories[catKey]}
                </button>
              ))}
            </div>

            {/* Input Search box */}
            <div className="relative pt-4 border-t border-slate-200">
              <label className="text-xs font-bold text-slate-500 block mb-1">{tHelp.searchLabel}</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={tHelp.searchPlaceholder}
                  className="w-full h-10 pl-9 pr-4 border border-slate-250 rounded-lg focus:outline-none focus:border-brand-orange text-xs text-slate-800 bg-white"
                  id="faq-search-input"
                />
                <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>

          {/* FAQs List column */}
          <div className="lg:col-span-2 space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-150 hover:border-slate-250 rounded-xl overflow-hidden transition-all shadow-xs"
                  id={`faq-item-${faq.id}`}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-sans font-bold text-sm sm:text-base text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden bg-slate-50 border-t border-slate-100"
                      >
                        <div className="px-5 py-4 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                          <p className="font-sans font-medium">{faq.answer}</p>
                          <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400 font-bold border-t border-slate-150/60 uppercase">
                            <span>{tHelp.categoryPrefix}{faq.category}</span>
                            <span className="text-brand-orange-dark flex items-center gap-0.5">{tHelp.verifiedBadge}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs sm:text-sm italic">
                {tHelp.emptyState}
              </div>
            )}

            {/* Government Info banner */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  {tHelp.govTitle}
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {tHelp.govDesc}
                </p>
              </div>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 shrink-0 shadow-xs animate-pulse hover:animate-none"
                id="gov-portal-link"
              >
                {tHelp.govBtn} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
