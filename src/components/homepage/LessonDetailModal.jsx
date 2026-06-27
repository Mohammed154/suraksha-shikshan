import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ShieldCheck, Key, Eye, EyeOff, AlertCircle, CheckCircle, 
  Mail, PhoneCall, Check, ArrowRight, ShieldAlert, Sparkles 
} from "lucide-react";

export default function LessonDetailModal({ lessonId, isOpen, onClose }) {
  // Common states
  const [activeStep, setActiveStep] = useState(0);

  // Lesson 1 states (Password Strength Game)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Lesson 2 states (Phishing Red Flags)
  const [clickedFlags, setClickedFlags] = useState([]);
  const [selectedFlagDetail, setSelectedFlagDetail] = useState(null);

  // Lesson 3 states (SMS Scam Quiz)
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen || lessonId === null) return null;

  // Lesson 1: Password Helper Functions
  const checkPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "શરૂ કરવા માટે ટાઈપ કરો", color: "text-slate-400", bg: "bg-slate-200" };
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;

    if (strength <= 1) return { score: 1, label: "ખૂબ નબળો (સરળતાથી હેક થઈ શકે)", color: "text-red-500", bg: "bg-red-500" };
    if (strength === 2) return { score: 2, label: "મધ્યમ (વધુ સારો બનાવો)", color: "text-amber-500", bg: "bg-amber-500" };
    if (strength === 3) return { score: 3, label: "મજબૂત (ખૂબ સરસ!)", color: "text-emerald-500", bg: "bg-emerald-500" };
    return { score: 4, label: "સુપર મજબૂત! (લોખંડી સુરક્ષા)", color: "text-green-600", bg: "bg-green-600" };
  };

  const strength = checkPasswordStrength(password);

  const passwordCriteria = [
    { label: "ઓછામાં ઓછા ૮ અક્ષરો", met: password.length >= 8 },
    { label: "ઓછામાં ઓછો એક નંબર (૦-૯)", met: /[0-9]/.test(password) },
    { label: "અંગ્રેજી નાની-મોટી બંને એબીસીડી (a-z અને A-Z)", met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
    { label: "સ્પેશિયલ ચિહ્ન (જેમ કે @, #, $, !, %)", met: /[^A-Za-z0-9]/.test(password) },
  ];

  // Lesson 2: Email Game Data
  const emailRedFlags = [
    {
      id: "sender",
      name: "ખોટું મોકલનારનું સરનામું",
      targetText: "From: sbi-security-update@alert-service-web.com",
      description: "બેંકો ક્યારેય 'alert-service-web.com' જેવા અજાણ્યા આઈડી પરથી ઈમેઈલ નથી મોકલતી. અસલી બેંકના ઈમેઈલ હંમેશા સત્તાવાર વેબ એડ્રેસ (જેમ કે @sbi.co.in) સાથે સમાપ્ત થાય છે.",
      top: "12%",
      left: "5%",
      width: "90%",
      height: "40px"
    },
    {
      id: "urgency",
      name: "તાત્કાલિક પગલાં લેવાની ધમકી",
      targetText: "તાત્કાલિક પગલાં: ૨૪ કલાકમાં KYC અપડેટ કરો નહીં તો એકાઉન્ટ બંધ થશે!",
      description: "સ્કેમર્સ તમને ગભરાવવા માંગે છે જેથી તમે વિચાર્યા વગર તેમની વાત માની લો. કોઈ સત્તાવાર સંસ્થા ૨૪ કલાક જેવી ટૂંકી ધમકી આપીને તમારું ખાતું આ રીતે ઓનલાઇન બંધ નથી કરી દેતી.",
      top: "28%",
      left: "5%",
      width: "90%",
      height: "55px"
    },
    {
      id: "link",
      name: "શંકાસ્પદ લિંક",
      targetText: "[ અહીં ક્લિક કરી KYC અપડેટ કરો ]",
      description: "આ લિંક પર ક્લિક કરવાથી તમે નકલી લોગિન પેજ પર પહોંચી જશો. સત્તાવાર બેંકિંગ માટે હંમેશા બ્રાઉઝરમાં સાચી વેબસાઈટ જાતે ટાઈપ કરીને જ લોગિન કરો (દા.ત. onlinesbi.sbi).",
      top: "55%",
      left: "20%",
      width: "60%",
      height: "45px"
    }
  ];

  const handleFlagClick = (flagId) => {
    if (!clickedFlags.includes(flagId)) {
      setClickedFlags([...clickedFlags, flagId]);
    }
    const found = emailRedFlags.find(f => f.id === flagId);
    if (found) {
      setSelectedFlagDetail(found.description);
    }
  };

  // Lesson 3: SMS/WhatsApp Quiz Data
  const quizItems = [
    {
      id: 1,
      sender: "SBI-ALERT",
      message: "પ્રિય ગ્રાહક, તમારું SBI બેંક ખાતું સસ્પેન્ડ થઈ ગયું છે. તેને ફરીથી સક્રિય કરવા માટે નીચે આપેલ લિંક પર ક્લિક કરી તમારો પાન કાર્ડ અને ઓટીપી નંબર દાખલ કરો: sbi-kyc-verify.com",
      isScam: true,
      explanation: "આ એક ઓનલાઇન ફિશિંગ સ્કેમ છે. કોઈ પણ બેંક ઓટીપી પૂછતી નથી કે શંકાસ્પદ લિંક દ્વારા એકાઉન્ટ ચાલુ કરવા માટે દબાણ કરતી નથી. અસલી બેંક વેબસાઇટ sbi.co.in છે.",
      redFlags: ["બેંકના નામ જેવો મોટો આઈડી", "ઓટીપી માંગવો", "નકલી લિંક"]
    },
    {
      id: 2,
      sender: "+91 99887 76655",
      message: "તમને KBC (કૌન બનેગા કરોડપતિ) તરફથી ૨૫ લાખ રૂપિયાની લોટરી લાગી છે! ટિકિટ નંબર ૯૧૨૩ છે. તમારા ઈનામના નાણાં મેળવવા માટે તાત્કાલિક અમારા લોટરી મેનેજર વિજય કુમારને આ નંબર પર વોટ્સએપ મેસેજ કરો.",
      isScam: true,
      explanation: "કરોડપતિ લોટરીના નામે કરવામાં આવતું આ એક પ્રખ્યાત કૌભાંડ છે. સ્કેમર્સ લોટરી આપવાના બહાને સરકારી ટેક્સ કે રજીસ્ટ્રેશન ફી તરીકે તમારી પાસેથી હજારો રૂપિયા ભરાવી લેશે અને ક્યારેય પૈસા પાછા નહિ આપે.",
      redFlags: ["મોબાઈલ નંબર પરથી અજાણ્યો મેસેજ", "મોટી રકમની લોટરીની લાલચ", "ટેક્સના નામે પહેલા પૈસા માંગવા"]
    },
    {
      id: 3,
      sender: "+91 94285 12345",
      message: "નમસ્તે દાદાજી, ગઈકાલે મેં જે પુસ્તક મંગાવ્યું હતું તે મારી પાસે આવી ગયું છે. આજે સાંજે હું તમને ઘેર મળવા આવીશ ત્યારે બતાવીશ.",
      isScam: false,
      explanation: "આ તમારા પરિવારના સભ્ય અથવા કોઈ પરિચિત વ્યક્તિનો સાદો અને સામાન્ય મેસેજ છે. આમાં કોઈ લિંક, નાણાંની તાત્કાલિક માંગણી કે અસામાન્ય ઓફર નથી. આ સંપૂર્ણપણે સુરક્ષિત છે.",
      redFlags: []
    }
  ];

  const handleQuizAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = quizItems[quizIndex].isScam === answer;
    if (correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (quizIndex < quizItems.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" id="lesson-detail-modal">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        id="lesson-modal-backdrop"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh] md:h-[85vh] z-10 border border-slate-200"
        id="lesson-modal-container"
      >
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-850 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-brand-orange/20 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
            </span>
            <div>
              <span className="text-[10px] tracking-wider text-slate-400 font-bold uppercase block">ડિજિટલ સુરક્ષા પાઠ શાળા</span>
              <h3 className="text-base sm:text-lg font-bold font-sans">
                {lessonId === 1 && "૧. તમારા એકાઉન્ટ્સ સુરક્ષિત કરો"}
                {lessonId === 2 && "૨. નકલી ઈમેઈલ ઓળખવા"}
                {lessonId === 3 && "૩. ફોન અને SMS સુરક્ષા"}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white hover:bg-slate-800 p-1.5 rounded-full transition-colors"
            id="close-lesson-modal-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Interactive Body */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 md:p-8 bg-slate-50 flex flex-col">
          
          {/* =======================================
              LESSON 1: PASSWORD SECURE
             ======================================= */}
          {lessonId === 1 && (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              {activeStep === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 max-w-2xl mx-auto py-2"
                >
                  <div className="text-center space-y-3">
                    <div className="bg-brand-orange/10 p-4 rounded-full w-fit mx-auto">
                      <Key className="w-10 h-10 text-brand-orange" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-navy">પાસવર્ડ કેમ મહત્વના છે?</h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      જેમ ઘર સુરક્ષિત રાખવા માટે મજબૂત તાળાની જરૂર પડે છે, તેમ ઓનલાઇન બેંકિંગ, વોટ્સએપ અને અન્ય એકાઉન્ટ્સને ચોરોથી બચાવવા માટે <strong>'મજબૂત પાસવર્ડ'</strong> સૌથી જરૂરી છે.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                    <h5 className="font-bold text-slate-800 text-sm sm:text-base">❌ શું ન કરવું જોઈએ:</h5>
                    <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">1.</span>
                        <span>સરળ નંબર જેમ કે <strong>123456</strong> કે <strong>0000</strong> ક્યારેય ન વાપરો.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">2.</span>
                        <span>તમારું નામ, ગામનું નામ કે જન્મતારીખ વાપરવાનું ટાળો. સ્કેમર્સ આ સૌથી પહેલા ટેસ્ટ કરે છે.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-xl space-y-3">
                    <h5 className="font-bold text-emerald-800 text-sm sm:text-base">✅ શ્રેષ્ઠ ઉપાય: 'વાક્ય પદ્ધતિ' (Passphrase)</h5>
                    <p className="text-emerald-700 text-xs sm:text-sm leading-relaxed">
                      એક સાદા પાસવર્ડના બદલે મનમાં એક યાદ રહી જાય તેવું વાક્ય વિચારો. જેમ કે: <strong>"હું રોજ સાંજે મંદિરે જાવ છું!"</strong> તેને મિક્સ કરીને લખો: <code>MandirSanje@108</code> - આ પાસવર્ડ ખૂબ મજબૂત છે અને સ્કેમર ક્યારેય અંદાજો લગાવી શકશે નહીં.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-5 max-w-2xl mx-auto w-full"
                >
                  <div className="text-center">
                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">રમત રમો</span>
                    <h4 className="text-xl font-bold text-brand-navy mt-1">તમારો પાસવર્ડ ચકાસો!</h4>
                    <p className="text-slate-500 text-xs sm:text-sm">નીચેના ખાનામાં કોઈ પાસવર્ડ ટાઈપ કરો અને જુઓ કે તે કેટલો મજબૂત છે (અમે તેને સેવ નથી કરતા!)</p>
                  </div>

                  {/* Password input form */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="અહીં પાસવર્ડ લખો..."
                        className="w-full h-12 pl-4 pr-12 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange text-slate-800 text-lg tracking-wide"
                        id="test-password-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                        id="toggle-test-password-visibility"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Live Strength Bar */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs sm:text-sm">
                          <span className="font-bold text-slate-700">સુરક્ષા સ્તર:</span>
                          <span className={`font-bold ${strength.color}`}>{strength.label}</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-150 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strength.bg} transition-all duration-300`} 
                            style={{ width: `${(strength.score / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Criteria checklist */}
                    <div className="border-t border-slate-100 pt-4 space-y-2.5">
                      <p className="text-xs text-slate-400 font-bold">સુરક્ષિત પાસવર્ડના લક્ષણો:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {passwordCriteria.map((criterion, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                            {criterion.met ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-slate-300 shrink-0" />
                            )}
                            <span className={criterion.met ? "text-slate-700 font-medium" : "text-slate-400"}>
                              {criterion.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Success advice */}
                    {strength.score >= 3 && (
                      <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>અદ્ભુત! આ પાસવર્ડ કોઈ જલ્દીથી હેક કરી શકશે નહીં. તેને તમારી ડાયરીમાં ગુપ્ત રીતે સાચવો.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step Navigation Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-auto shrink-0">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(0)}
                  className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
                    activeStep === 0 
                      ? "text-slate-300 cursor-not-allowed" 
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                  id="prev-step-btn"
                >
                  પાછળ જાઓ
                </button>
                {activeStep === 0 ? (
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-6 py-2.5 bg-brand-navy text-white hover:bg-slate-800 rounded-lg font-bold text-sm flex items-center gap-1"
                    id="next-step-btn"
                  >
                    પાસવર્ડ ટેસ્ટ કરો <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-brand-orange text-slate-950 hover:bg-brand-orange/90 rounded-lg font-bold text-sm flex items-center gap-1"
                    id="finish-step-btn"
                  >
                    પાઠ પૂર્ણ કરો <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =======================================
              LESSON 2: EMAIL GAME
             ======================================= */}
          {lessonId === 2 && (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <span className="bg-brand-orange/15 text-brand-orange-dark text-xs px-2.5 py-1 rounded-full font-bold">રમત રમો: નકલી ઈમેઈલ શોધો!</span>
                <h4 className="text-lg sm:text-xl font-bold text-brand-navy mt-1">અસલી જેવો દેખાતો નકલી ઈમેઈલ</h4>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  નીચે એક ઈમેઈલ આપ્યો છે. તેમાં રહેલી <strong>૩ જોખમી બાબતો (ચેતવણીઓ)</strong> પર ક્લિક કરીને શોધો.
                </p>
              </div>

              {/* Main Game Screen */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch flex-grow">
                {/* Simulated Phishing Email */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
                  {/* Top bar of email client */}
                  <div className="bg-slate-100 px-4 py-2 flex items-center gap-2 border-b border-slate-200 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
                    <span className="text-[10px] text-slate-400 ml-2 font-mono">ઇનબોક્સ - સિક્યોર મેઇલ ક્લાયન્ટ</span>
                  </div>

                  {/* Mail Envelope Details */}
                  <div className="p-4 border-b border-slate-150 space-y-1 bg-slate-50/50 text-xs md:text-sm text-slate-700 shrink-0">
                    {/* Hotspot 1: Sender address */}
                    <div 
                      onClick={() => handleFlagClick("sender")}
                      className={`p-1.5 rounded cursor-pointer transition-all ${
                        clickedFlags.includes("sender") 
                          ? "bg-red-50 border border-red-200 text-red-800" 
                          : "hover:bg-amber-50 hover:ring-2 hover:ring-amber-300"
                      }`}
                      id="hotspot-sender"
                    >
                      <span className="font-bold">મોકલનાર (From):</span> sbi-security-update@alert-service-web.com
                      {clickedFlags.includes("sender") && <span className="ml-2 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">મળી ગયું!</span>}
                    </div>

                    <div className="p-1">
                      <span className="font-bold">પ્રાપ્તકર્તા (To):</span> mohammedsongadhwala@gmail.com
                    </div>

                    {/* Hotspot 2: Urgency header */}
                    <div 
                      onClick={() => handleFlagClick("urgency")}
                      className={`p-1.5 rounded cursor-pointer transition-all font-bold ${
                        clickedFlags.includes("urgency") 
                          ? "bg-red-50 border border-red-200 text-red-800" 
                          : "hover:bg-amber-50 hover:ring-2 hover:ring-amber-300 text-slate-900"
                      }`}
                      id="hotspot-urgency"
                    >
                      <span>વિષય: તાત્કાલિક પગલાં: ૨૪ કલાકમાં KYC અપડેટ કરો નહીં તો એકાઉન્ટ બંધ થશે!</span>
                      {clickedFlags.includes("urgency") && <span className="ml-2 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">મળી ગયું!</span>}
                    </div>
                  </div>

                  {/* Mail Body */}
                  <div className="p-4 sm:p-6 text-xs sm:text-sm text-slate-700 leading-relaxed flex-grow">
                    <p className="mb-3">પ્રિય ગ્રાહક,</p>
                    <p className="mb-4">
                      તમારા ઓનલાઇન સ્ટેટ બેંક ખાતાની સુરક્ષા તપાસ હેઠળ છે. સરકારી નિયમો મુજબ દર વર્ષે ખાતાનું ઓનલાઇન KYC (નો યોર કસ્ટમર) વેરિફિકેશન કરવું ફરજિયાત છે. જો તમે આગામી ૨૪ કલાકમાં આ અપડેટ પૂર્ણ નહીં કરો, તો સુરક્ષા કારણોસર તમારું ખાતું કાયમ માટે સ્થગિત (બ્લોક) કરી દેવામાં આવશે.
                    </p>

                    {/* Hotspot 3: Suspicious Link Button */}
                    <div className="my-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleFlagClick("link")}
                        className={`inline-block px-5 py-3 rounded-lg font-bold text-sm tracking-wide transition-all ${
                          clickedFlags.includes("link")
                            ? "bg-red-100 text-red-800 border border-red-300 ring-2 ring-red-500"
                            : "bg-blue-600 hover:bg-blue-700 text-white animate-pulse hover:ring-4 hover:ring-blue-200"
                        }`}
                        id="hotspot-link"
                      >
                        [ અહીં ક્લિક કરી ઓનલાઇન KYC વેરિફિકેશન પૂર્ણ કરો ]
                      </button>
                      {clickedFlags.includes("link") && (
                        <span className="block mt-1 text-xs text-red-600 font-bold">⚠️ આ નકલી કડી છે! (sbi-kyc-verify-portal.in)</span>
                      )}
                    </div>

                    <p className="mb-2">અમે તમારી સુરક્ષા માટે હંમેશા કટિબદ્ધ છીએ.</p>
                    <p className="font-bold">આભાર,<br />SBI સુરક્ષા ટીમ</p>
                  </div>
                </div>

                {/* Game Information & Explanations Sidebar */}
                <div className="bg-slate-100 rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-bold text-slate-800 text-sm sm:text-base">મળેલી ચેતવણીઓ:</h5>
                      <span className="bg-brand-navy text-white font-bold font-mono px-2 py-0.5 rounded text-sm">
                        {clickedFlags.length} / 3
                      </span>
                    </div>

                    {/* Score gauge */}
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${(clickedFlags.length / 3) * 100}%` }}
                      />
                    </div>

                    {/* Hint / Explanation text */}
                    <AnimatePresence mode="wait">
                      {selectedFlagDetail ? (
                        <motion.div
                          key={selectedFlagDetail}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-white p-4 rounded-lg border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-100 text-red-800 p-1 rounded-full">
                              <ShieldAlert className="w-4 h-4 text-red-600" />
                            </span>
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">સાયબર ચેતવણી રહસ્ય:</span>
                          </div>
                          {selectedFlagDetail}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 1 }}
                          className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 text-center text-slate-500 text-xs"
                        >
                          ડાબી બાજુના ઈમેઈલ પર પીળા રંગથી ચમકતા અથવા આપેલા લાલ વિસ્તારો પર ક્લિક કરીને જોખમી લાલ ઝંડી શોધો!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Complete status */}
                  {clickedFlags.length === 3 ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-emerald-800 text-xs mt-4">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span className="font-bold">ખૂબ જ સરસ કામગીરી!</span>
                      </div>
                      <span>તમે આ ફિશિંગ ઈમેઈલની ત્રણેય મોટી છેતરપિંડી લાલ ઝંડી શોધી કાઢી છે. હવે તમે સજાગ સાયબર નાગરિક છો!</span>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-center text-xs italic mt-4">
                      તમામ ૩ છેતરપિંડી નિશાનીઓ શોધી આગળ વધો.
                    </div>
                  )}
                </div>
              </div>

              {/* Footer navigation */}
              <div className="flex justify-end pt-4 border-t border-slate-200 mt-auto shrink-0">
                <button
                  disabled={clickedFlags.length < 3}
                  onClick={onClose}
                  className={`px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                    clickedFlags.length === 3
                      ? "bg-brand-orange text-slate-950 hover:bg-brand-orange/90 shadow-md active:scale-95 cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                  id="finish-email-game-btn"
                >
                  പാഠ പൂർത്തിയാക്കുക <Check className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =======================================
              LESSON 3: PHONE & SMS SCAM QUIZ
             ======================================= */}
          {lessonId === 3 && (
            <div className="flex-grow flex flex-col justify-between space-y-6">
              {!quizFinished ? (
                <div className="flex-grow flex flex-col justify-between max-w-2xl mx-auto w-full">
                  <div className="text-center space-y-1">
                    <span className="bg-brand-orange/15 text-brand-orange-dark text-xs px-2.5 py-1 rounded-full font-bold">ચેટ ટેસ્ટ: સાચું કે ખોટું?</span>
                    <h4 className="text-xl font-bold text-brand-navy">શું આ મેસેજ અસલી છે કે છેતરપિંડી?</h4>
                    <p className="text-slate-500 text-xs sm:text-sm">તમારી સામે નીચે એક મોબાઈલ મેસેજ પ્રદર્શિત છે. સાચો નિર્ણય લો.</p>
                  </div>

                  {/* Quiz Simulator Body */}
                  <div className="my-6 space-y-5 flex-grow flex flex-col justify-center">
                    {/* Progress Indicator */}
                    <div className="flex justify-between items-center text-xs text-slate-500 max-w-md mx-auto w-full">
                      <span>પ્રશ્ન {quizIndex + 1} / {quizItems.length}</span>
                      <span>સાચા જવાબો: {score}</span>
                    </div>

                    {/* Simulated Phone Screen */}
                    <div className="bg-slate-900 text-white rounded-3xl p-4 max-w-md mx-auto w-full border-[6px] border-slate-800 shadow-lg relative overflow-hidden aspect-[4/3] flex flex-col justify-between">
                      {/* Status bar */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono border-b border-slate-800 pb-2 mb-2">
                        <span>SafeDigital સિક્યોર</span>
                        <span>૧૨:૩૦ PM</span>
                        <span>📶 5G</span>
                      </div>

                      {/* Sender Header */}
                      <div className="flex items-center gap-2 mb-3 bg-slate-850 p-2 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-200 font-bold text-xs">
                          {quizItems[quizIndex].sender.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-200">{quizItems[quizIndex].sender}</div>
                          <span className="text-[9px] text-emerald-500 flex items-center gap-1">🛡️ સુરક્ષિત કનેક્શન તપાસેલ</span>
                        </div>
                      </div>

                      {/* Chat Message Bubble */}
                      <div className="flex-grow flex items-center justify-center p-2">
                        <div className="bg-[#202c33] border border-slate-850 p-4 rounded-2xl text-slate-100 text-xs sm:text-sm leading-relaxed max-w-[90%] shadow-md">
                          {quizItems[quizIndex].message}
                        </div>
                      </div>

                      {/* Phone footer indicator */}
                      <div className="h-1 bg-slate-700 w-1/3 rounded-full mx-auto mt-2 shrink-0"></div>
                    </div>

                    {/* User Actions */}
                    {!showExplanation ? (
                      <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto w-full">
                        <button
                          onClick={() => handleQuizAnswer(true)}
                          className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                          id="btn-scam-choice"
                        >
                          <ShieldAlert className="w-4 h-4" />
                          આ છેતરપિંડી (સ્કેમ) છે
                        </button>
                        <button
                          onClick={() => handleQuizAnswer(false)}
                          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
                          id="btn-safe-choice"
                        >
                          <CheckCircle className="w-4 h-4" />
                          આ સંપૂર્ણ સલામત છે
                        </button>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border max-w-md mx-auto w-full text-xs sm:text-sm ${
                          selectedAnswer === quizItems[quizIndex].isScam
                            ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}
                        id="quiz-explanation-box"
                      >
                        <div className="flex items-center gap-2 font-bold mb-1.5 text-xs sm:text-sm">
                          {selectedAnswer === quizItems[quizIndex].isScam ? (
                            <>
                              <Check className="w-5 h-5 bg-emerald-600 text-white rounded-full p-0.5" />
                              <span>સાચો નિર્ણય!</span>
                            </>
                          ) : (
                            <>
                              <X className="w-5 h-5 bg-red-600 text-white rounded-full p-0.5" />
                              <span>ખોટો નિર્ણય. સાવચેત રહો!</span>
                            </>
                          )}
                        </div>
                        <p className="leading-relaxed mb-3 text-xs sm:text-sm text-slate-700">
                          {quizItems[quizIndex].explanation}
                        </p>

                        {/* Red Flags highlighted */}
                        {quizItems[quizIndex].redFlags.length > 0 && (
                          <div className="border-t border-slate-200/60 pt-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">આ મેસેજના જોખમી ચિહ્નો (રેડ ફ્લેગ્સ):</span>
                            <div className="flex flex-wrap gap-1.5">
                              {quizItems[quizIndex].redFlags.map((flag, idx) => (
                                <span key={idx} className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[11px] font-medium">
                                  🚩 {flag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          onClick={handleNextQuiz}
                          className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition-all"
                          id="btn-next-quiz"
                        >
                          આગળનો પ્રશ્ન <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              ) : (
                /* Quiz Ended Scorecard Screen */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto py-8 text-center space-y-6 flex-grow flex flex-col justify-center"
                >
                  <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm space-y-4">
                    <div className="bg-emerald-500 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-2xl font-black text-emerald-800">અભિનંદન! પાઠ પૂરો થયો</h4>
                      <p className="text-slate-600 text-sm">તમે ફોન અને એસએમએસ ચેતવણી ક્વિઝ સફળતાપૂર્વક પૂર્ણ કરી છે.</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-400 font-bold block">તમારું સ્કોરકાર્ડ</span>
                      <div className="text-3xl font-black text-slate-800 mt-1">{score} / {quizItems.length}</div>
                      <span className="text-xs text-slate-500 block mt-1">સાચા નિર્ણયો લીધા</span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      યાદ રાખો: સ્કેમર્સ સતત નવી તરકીબો શોધતા રહે છે. જો કોઈ તમને અતિશય પૈસાની લાલચ આપે અથવા બેંકમાંથી ફોન હોવાનો દાવો કરી OTP/PIN માંગે, તો હંમેશા તેને છેતરપિંડી જ માની કૉલ કાપી નાખો.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={resetQuiz}
                      className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-all"
                      id="btn-retry-quiz"
                    >
                      ફરીથી રમો
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 py-3 bg-brand-orange text-slate-950 hover:bg-brand-orange/90 font-bold rounded-xl shadow-md transition-all"
                      id="btn-close-quiz"
                    >
                      પૂર્ણ કરો
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
