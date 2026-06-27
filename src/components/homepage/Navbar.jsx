import { useState } from "react";
import { Phone, Menu, X, Shield, BookOpen, AlertTriangle, HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar({ activeTab, setActiveTab, onEmergencyClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const toggleLang = () => {
    const next = lang === "gu" ? "en" : "gu";
    i18n.changeLanguage(next);
  };

  const navItems = [
    { id: "lessons", label: lang === "gu" ? "પાઠો" : "Lessons", icon: BookOpen },
    { id: "alerts", label: lang === "gu" ? "સ્કેમ એલર્ટ્સ" : "Scam Alerts", icon: AlertTriangle },
    { id: "help", label: lang === "gu" ? "સહાય કેન્દ્ર" : "Help Center", icon: HelpCircle },
  ];

  const handleLogoClick = () => {
    setActiveTab("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    
    // Find the element and scroll to it smoothly
    const element = document.getElementById(tabId + "-section");
    if (element) {
      const yOffset = -90; // Fixed header spacing
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 h-20 fixed top-0 w-full z-40 shadow-xs">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 max-w-7xl mx-auto h-full">
        {/* Brand Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2 cursor-pointer group"
          id="navbar-logo"
        >
          <div className="bg-brand-navy text-white p-2 rounded-lg group-hover:bg-brand-orange transition-colors">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            SafeDigital
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`font-sans font-semibold text-base lg:text-lg transition-colors py-2 relative ${
                activeTab === item.id 
                  ? "text-brand-orange-dark" 
                  : "text-slate-600 hover:text-slate-900"
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange-dark rounded-full" />
              )}
            </button>
          ))}

          {/* Language Toggle Button */}
          <button
            onClick={toggleLang}
            className="border border-[#131b2e] hover:bg-[#131b2e] hover:text-[#bec6e0] text-[#131b2e] rounded-lg px-3 py-2 font-sans font-bold text-sm transition-all active:scale-95 cursor-pointer shadow-xs min-h-[40px] flex items-center justify-center gap-1.5"
            id="nav-lang-toggle-btn"
          >
            <span>🌐</span>
            <span>{lang === "gu" ? "English" : "ગુજરાતી"}</span>
          </button>

          {/* Emergency Helpline Call Button */}
          <button
            onClick={onEmergencyClick}
            className="h-12 px-6 bg-[#131b2e] hover:bg-[#1f2b48] text-[#bec6e0] rounded-lg font-bold flex items-center gap-2 transition-all active:scale-95 text-sm cursor-pointer shadow-sm"
            id="nav-emergency-call-btn"
          >
            <Phone className="w-4 h-4 text-brand-orange fill-brand-orange" />
            {lang === "gu" ? "ઇમરજન્સી કોલ" : "Emergency Call"}
          </button>
        </div>

        {/* Mobile Actions: Language Toggle & Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Language Toggle */}
          <button
            onClick={toggleLang}
            className="border border-[#131b2e] hover:bg-[#131b2e] hover:text-[#bec6e0] text-[#131b2e] rounded-lg px-2.5 py-1.5 font-sans font-bold text-xs transition-all active:scale-95 cursor-pointer"
            id="mobile-lang-toggle-btn"
          >
            {lang === "gu" ? "EN" : "ગુ"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-lg px-4 py-6 space-y-4 z-40 animate-fade-in" id="mobile-menu-drawer">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-semibold text-base transition-colors ${
                    activeTab === item.id 
                      ? "bg-orange-50 text-brand-orange-dark" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  <IconComp className="w-5 h-5 text-slate-500 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEmergencyClick();
              }}
              className="w-full h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-sm"
              id="mobile-nav-emergency-btn"
            >
              <Phone className="w-4 h-4 fill-white" />
              {lang === "gu" ? "ઇમરજન્સી કોલ" : "Emergency Call"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
