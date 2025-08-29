import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEnglish = location.pathname.startsWith('/en');
  const currentLanguage = isEnglish ? 'eng' : 'kin';

  const languages = [
    { value: 'kin', label: 'Kinyarwanda', flag: '🇷🇼', code: 'kin' },
    { value: 'eng', label: 'English', flag: '🇬🇧', code: 'eng' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false);
    if (langCode === 'eng') {
      navigate('/en');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangData = languages.find(
    (lang) => lang.value === currentLanguage
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-between w-52 px-4 py-3 text-sm font-medium bg-white border border-gray-200 rounded-xl shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        id="language-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Globe className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-700">{currentLangData?.label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-200"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.value}
                className={`flex items-center w-full px-4 py-3 text-sm text-left transition-colors duration-150 ${
                  currentLanguage === language.value
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.value)}
              >
                <span className="text-lg mr-3">{language.flag}</span>
                <span className="flex-1">{language.label}</span>
                {currentLanguage === language.value && (
                  <span className="ml-2 text-blue-500">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
