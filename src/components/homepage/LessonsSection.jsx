import { useState } from "react";
import { motion } from "framer-motion";
import { Search, PlayCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LessonsSection({ onLessonSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const labels = {
    en: {
      title: "Find Lessons",
      subtitle: "Step-by-step guides for a secure digital life.",
      viewAll: "View All Lessons",
      viewMain: "View Main Lessons",
      placeholder: "Search lesson name...",
      playBtn: "View & Play Lesson",
      emptyState: "No lessons found for your search. Please try a different name."
    },
    gu: {
      title: "પાઠો શોધો",
      subtitle: "સુરક્ષિત ડિજિટલ જીવન માટે સ્ટેપ-બાય-સ્ટેપ માર્ગદર્શિકા.",
      viewAll: "બધા પાઠ જુઓ",
      viewMain: "મુખ્ય પાઠો જુઓ",
      placeholder: "પાઠનું નામ શોધો...",
      playBtn: "પાઠ જુઓ અને રમો",
      emptyState: "તમારા શોધ એરિયા માટે કોઈ પાઠ મળ્યો નથી. કૃપા કરીને અન્ય નામથી સર્ચ કરો."
    }
  };

  const tSect = labels[lang] || labels.en;

  const lessonsData = {
    en: [
      {
        id: "lesson_1_otp",
        title: "1. Never Share Your OTP",
        shortDesc: "Ramesh bhai (retired, 65) receives an unknown call from SBI bank asking for OTP. Learn what to do.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssdbonGp_B4Bg0M7Teyx8z5RTCZhrHbuS8C-gdJ6iNz47_Hyk-T38UxZeGkRo4ixL7OP6EtC6s-LY19x1y5gbQjF4GPXbbjRvBxkd-caghP_DMMY9NL_LeKux0791yR0a1gdDPfBsXg8Ewy8c_dCnE96vC8HF-dBjtd8UtWASmPJOwIOpOTJX-v0MwwQNuPYjME-k9Ijl1WZG4n06L0_Y8n4XZEn5AP2E_i2bDnXwFUJgpcqH49gfjXVY0Ux7XyP-nPiSUzeBffY",
        difficulty: "Easy",
        difficultyKey: "easy",
        duration: "5 min"
      },
      {
        id: "lesson_2_prize",
        title: "2. That Prize Is Fake!",
        shortDesc: "Savitaben (58) receives a fake WhatsApp message about a 25 Lakh lottery. Avoid lottery scams.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSqTb7X3oN6fjDV7blU5uM2L8alOhb79lhQfolC4LXeR-859Tyx80ov8A74JkSyFu9ZCwkVOWYaSW95ABFZBRQNjyMjlvx3diu6ptVnGObF1kjIjsnCPXrSYjLUcSt-WV8vjg9tJekoIkB_-D5uSMOyzt631dXhhZR3DBMjfBGzNCFlVawdsN8ug1KwipoQjZVrnjHlZA3F_Tq5VFbB_Y4tDgZlIATUZVXy1dQo_IlepH-czgXXaAOOZrkaoOK9qW87f_tkmb1fr0",
        difficulty: "Easy",
        difficultyKey: "easy",
        duration: "5 min"
      },
      {
        id: "lesson_3_link",
        title: "3. Is This Link Safe?",
        shortDesc: "Kiran (22) receives phishing links. Identify 3 red flags before clicking on any link.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA19PJI1_GMiyXF-emg4YCU_CJ-5t0Pg-L09wfQgoa2yfhY8VQRmbypTL9eElPvA4Iq19xEQTYkjuoGW-8q_TQGcApoEPvnBpZzJ1pchD9Qm6IRpb5zKVYw71ZWE81OoB04RuFT5btuT5mie5ReDNk5cFCOBS1S2yJBS_DYvexSOjAky4kqQwliJVmdMCxLuuC7K1qsq-QcjboAAYTqPOaIGeyzGBieLVYoH5kw4HQgQiXg3zEQ7GLD3lQf-FJYYrVz7Czr5eVsJDs",
        difficulty: "Medium",
        difficultyKey: "medium",
        duration: "6 min"
      },
      {
        id: "lesson_4_job",
        title: "4. The Fake Job Trap",
        shortDesc: "Mohan (19) receives an attractive job offer which turns out to be a scam. Avoid fake recruitment.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssdbonGp_B4Bg0M7Teyx8z5RTCZhrHbuS8C-gdJ6iNz47_Hyk-T38UxZeGkRo4ixL7OP6EtC6s-LY19x1y5gbQjF4GPXbbjRvBxkd-caghP_DMMY9NL_LeKux0791yR0a1gdDPfBsXg8Ewy8c_dCnE96vC8HF-dBjtd8UtWASmPJOwIOpOTJX-v0MwwQNuPYjME-k9Ijl1WZG4n06L0_Y8n4XZEn5AP2E_i2bDnXwFUJgpcqH49gfjXVY0Ux7XyP-nPiSUzeBffY",
        difficulty: "Medium",
        difficultyKey: "medium",
        duration: "7 min"
      },
      {
        id: "lesson_5_upi",
        title: "5. UPI 'Request' = You Pay!",
        shortDesc: "Heena (35) receives a UPI collect request during online shopping. Never type your PIN to receive money.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA19PJI1_GMiyXF-emg4YCU_CJ-5t0Pg-L09wfQgoa2yfhY8VQRmbypTL9eElPvA4Iq19xEQTYkjuoGW-8q_TQGcApoEPvnBpZzJ1pchD9Qm6IRpb5zKVYw71ZWE81OoB04RuFT5btuT5mie5ReDNk5cFCOBS1S2yJBS_DYvexSOjAky4kqQwliJVmdMCxLuuC7K1qsq-QcjboAAYTqPOaIGeyzGBieLVYoH5kw4HQgQiXg3zEQ7GLD3lQf-FJYYrVz7Czr5eVsJDs",
        difficulty: "Medium",
        difficultyKey: "medium",
        duration: "6 min"
      },
      {
        id: "lesson_6_aadhaar",
        title: "6. Protect Your Aadhaar",
        shortDesc: "Jayshreeben (72) gets guided about Aadhaar card verification scams and identity theft protection.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSqTb7X3oN6fjDV7blU5uM2L8alOhb79lhQfolC4LXeR-859Tyx80ov8A74JkSyFu9ZCwkVOWYaSW95ABFZBRQNjyMjlvx3diu6ptVnGObF1kjIjsnCPXrSYjLUcSt-WV8vjg9tJekoIkB_-D5uSMOyzt631dXhhZR3DBMjfBGzNCFlVawdsN8ug1KwipoQjZVrnjHlZA3F_Tq5VFbB_Y4tDgZlIATUZVXy1dQo_IlepH-czgXXaAOOZrkaoOK9qW87f_tkmb1fr0",
        difficulty: "Advanced",
        difficultyKey: "advanced",
        duration: "8 min"
      }
    ],
    gu: [
      {
        id: "lesson_1_otp",
        title: "૧. OTP ક્યારેય share ન કરો",
        shortDesc: "Ramesh bhai (retired, 65) ને SBI bank થી અજાણ્યો કૉલ આવે છે અને OTP માંગે છે. જાણો શું કરવું.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssdbonGp_B4Bg0M7Teyx8z5RTCZhrHbuS8C-gdJ6iNz47_Hyk-T38UxZeGkRo4ixL7OP6EtC6s-LY19x1y5gbQjF4GPXbbjRvBxkd-caghP_DMMY9NL_LeKux0791yR0a1gdDPfBsXg8Ewy8c_dCnE96vC8HF-dBjtd8UtWASmPJOwIOpOTJX-v0MwwQNuPYjME-k9Ijl1WZG4n06L0_Y8n4XZEn5AP2E_i2bDnXwFUJgpcqH49gfjXVY0Ux7XyP-nPiSUzeBffY",
        difficulty: "સરળ",
        difficultyKey: "easy",
        duration: "૫ મિનિટ"
      },
      {
        id: "lesson_2_prize",
        title: "૨. ઇનામ સાચું નથી!",
        shortDesc: "Savitaben (58) ને ૨૫ લાખની લોટરીનો નકલી WhatsApp મેસેજ મળે છે. લોટરી કૌભાંડથી બચો.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSqTb7X3oN6fjDV7blU5uM2L8alOhb79lhQfolC4LXeR-859Tyx80ov8A74JkSyFu9ZCwkVOWYaSW95ABFZBRQNjyMjlvx3diu6ptVnGObF1kjIjsnCPXrSYjLUcSt-WV8vjg9tJekoIkB_-D5uSMOyzt631dXhhZR3DBMjfBGzNCFlVawdsN8ug1KwipoQjZVrnjHlZA3F_Tq5VFbB_Y4tDgZlIATUZVXy1dQo_IlepH-czgXXaAOOZrkaoOK9qW87f_tkmb1fr0",
        difficulty: "સરળ",
        difficultyKey: "easy",
        duration: "૫ મિનિટ"
      },
      {
        id: "lesson_3_link",
        title: "૩. આ link safe છે?",
        shortDesc: "Kiran (22) ને ફિશિંગ લિંક્સ મળે છે. લિંક પર ક્લિક કરતા પહેલા ૩ રેડ ફ્લેગ્સ ઓળખો.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA19PJI1_GMiyXF-emg4YCU_CJ-5t0Pg-L09wfQgoa2yfhY8VQRmbypTL9eElPvA4Iq19xEQTYkjuoGW-8q_TQGcApoEPvnBpZzJ1pchD9Qm6IRpb5zKVYw71ZWE81OoB04RuFT5btuT5mie5ReDNk5cFCOBS1S2yJBS_DYvexSOjAky4kqQwliJVmdMCxLuuC7K1qsq-QcjboAAYTqPOaIGeyzGBieLVYoH5kw4HQgQiXg3zEQ7GLD3lQf-FJYYrVz7Czr5eVsJDs",
        difficulty: "મધ્યમ",
        difficultyKey: "medium",
        duration: "૬ મિનિટ"
      },
      {
        id: "lesson_4_job",
        title: "૪. નકલી નોકરી ફસાણ",
        shortDesc: "Mohan (19) ને મોભાદાર જોબ ઓફર મળે છે જે પાછળથી છેતરપિંડી નીકળે છે. નકલી ભરતીથી બચો.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDssdbonGp_B4Bg0M7Teyx8z5RTCZhrHbuS8C-gdJ6iNz47_Hyk-T38UxZeGkRo4ixL7OP6EtC6s-LY19x1y5gbQjF4GPXbbjRvBxkd-caghP_DMMY9NL_LeKux0791yR0a1gdDPfBsXg8Ewy8c_dCnE96vC8HF-dBjtd8UtWASmPJOwIOpOTJX-v0MwwQNuPYjME-k9Ijl1WZG4n06L0_Y8n4XZEn5AP2E_i2bDnXwFUJgpcqH49gfjXVY0Ux7XyP-nPiSUzeBffY",
        difficulty: "મધ્યમ",
        difficultyKey: "medium",
        duration: "૭ મિનિટ"
      },
      {
        id: "lesson_5_upi",
        title: "૫. UPI 'Request' = ચૂકવણી!",
        shortDesc: "Heena (35) ને ઓનલાઇન ખરીદીમાં UPI collect request મળે છે. નાણાં મેળવવા પિન ટાઈપ ન કરો.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA19PJI1_GMiyXF-emg4YCU_CJ-5t0Pg-L09wfQgoa2yfhY8VQRmbypTL9eElPvA4Iq19xEQTYkjuoGW-8q_TQGcApoEPvnBpZzJ1pchD9Qm6IRpb5zKVYw71ZWE81OoB04RuFT5btuT5mie5ReDNk5cFCOBS1S2yJBS_DYvexSOjAky4kqQwliJVmdMCxLuuC7K1qsq-QcjboAAYTqPOaIGeyzGBieLVYoH5kw4HQgQiXg3zEQ7GLD3lQf-FJYYrVz7Czr5eVsJDs",
        difficulty: "મધ્યમ",
        difficultyKey: "medium",
        duration: "૬ મિનિટ"
      },
      {
        id: "lesson_6_aadhaar",
        title: "૬. Aadhaar સંભાળ",
        shortDesc: "Jayshreeben (72) ને આધાર કાર્ડ વેરિફિકેશન અને ઓળખ ચોરીથી બચવા વિશે માર્ગદર્શન.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSqTb7X3oN6fjDV7blU5uM2L8alOhb79lhQfolC4LXeR-859Tyx80ov8A74JkSyFu9ZCwkVOWYaSW95ABFZBRQNjyMjlvx3diu6ptVnGObF1kjIjsnCPXrSYjLUcSt-WV8vjg9tJekoIkB_-D5uSMOyzt631dXhhZR3DBMjfBGzNCFlVawdsN8ug1KwipoQjZVrnjHlZA3F_Tq5VFbB_Y4tDgZlIATUZVXy1dQo_IlepH-czgXXaAOOZrkaoOK9qW87f_tkmb1fr0",
        difficulty: "અદ્યતન",
        difficultyKey: "advanced",
        duration: "૮ મિનિટ"
      }
    ]
  };

  const list = lessonsData[lang] || lessonsData.en;
  const initialLessons = list.slice(0, 3);
  const extendedLessons = list;

  const displayedLessons = showAll ? extendedLessons : initialLessons;

  // Filter lessons based on search
  const filteredLessons = displayedLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.shortDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 md:py-16 bg-white" id="lessons-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title and Header bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {tSect.title}
            </h2>
            <p className="font-sans text-slate-500 text-sm sm:text-base">
              {tSect.subtitle}
            </p>
          </div>
          
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-brand-orange-dark hover:text-brand-orange font-bold text-sm sm:text-base flex items-center gap-1 group transition-colors cursor-pointer"
            id="view-all-lessons-btn"
          >
            {showAll ? tSect.viewMain : tSect.viewAll}
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Optional Expanded Search Bar */}
        {showAll && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-8 max-w-md"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={tSect.placeholder}
              className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange text-sm text-slate-800"
              id="lesson-search-input"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
          </motion.div>
        )}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredLessons.map((lesson) => (
            <motion.div
              layout
              key={lesson.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 group"
              id={`lesson-card-${lesson.id}`}
            >
              {/* Image Container */}
              <div className="h-44 sm:h-48 mb-4 rounded-xl overflow-hidden bg-slate-100 relative">
                <img 
                  alt={lesson.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                  src={lesson.image}
                  referrerPolicy="no-referrer"
                />
                
                {/* Meta Labels floating */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                    lesson.difficultyKey === "easy" ? "bg-emerald-100 text-emerald-800" :
                    lesson.difficultyKey === "medium" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {lesson.difficulty}
                  </span>
                  <span className="text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded-full font-bold backdrop-blur-xs flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {lesson.duration}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-base sm:text-lg font-bold mb-2 text-slate-900 group-hover:text-brand-orange-dark transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {lesson.shortDesc}
                  </p>
                </div>

                {/* Interactive Launch Button */}
                <button
                  onClick={() => onLessonSelect(lesson.id)}
                  className="h-12 w-full border-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-xs sm:text-sm border-[#131b2e] text-[#131b2e] hover:bg-slate-100 cursor-pointer active:scale-98"
                  id={`view-lesson-btn-${lesson.id}`}
                >
                  <PlayCircle className="w-4.5 h-4.5" />
                  {tSect.playBtn}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm">
            {tSect.emptyState}
          </div>
        )}

      </div>
    </section>
  );
}
