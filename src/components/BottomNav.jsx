import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const tabs = [
  { to: '/dashboard',  key: 'home',    icon: '🏠' },
  { to: '/lessons',    key: 'lessons', icon: '📚' },
  { to: '/link-check', key: 'link',    icon: '🔍' },
  { to: '/report',     key: 'report',  icon: '🚨' },
];

export default function BottomNav() {
  const { t } = useTranslation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200
                    flex items-stretch safe-bottom shadow-[0_-2px_8px_rgba(0,0,0,0.08)]">
      {tabs.map(({ to, key, icon }) => (
        <NavLink
          key={key}
          to={to}
          end={to === '/dashboard'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium
             transition-colors min-h-[56px]
             ${isActive ? 'text-navy border-t-2 border-navy' : 'text-gray-400 hover:text-navy'}`
          }
        >
          <span className="text-2xl leading-none">{icon}</span>
          <span className="font-gu text-[13px]">{t(`nav.${key}`)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
