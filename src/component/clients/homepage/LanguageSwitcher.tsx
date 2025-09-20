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

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-400 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-all duration-150 md:px-4 md:py-2.5 md:rounded-xl md:w-48 lg:w-52"
        id="language-menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Globe className="w-3.5 h-3.5 mr-1.5 text-gray-500 md:w-4 md:h-4 md:mr-2" />
          <span className="text-gray-700 text-xs md:text-sm">
            {currentLanguage === 'eng' ? 'ENG' : 'KIN'}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 ml-1 text-gray-400 transition-transform duration-150 md:w-4 md:h-4 md:ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 w-48 mt-1 origin-top-right bg-white border border-gray-400 divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-150 md:w-56 md:rounded-xl md:mt-2"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1 md:py-2">
            {languages.map((language) => (
              <button
                key={language.value}
                className={`flex items-center w-full px-3 py-2 text-xs text-left transition-colors duration-150 md:px-4 md:py-2.5 md:text-sm ${
                  currentLanguage === language.value
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
                onClick={() => handleLanguageChange(language.value)}
              >
                <span className="text-base mr-2 md:text-lg md:mr-3">{language.flag}</span>
                <span className="flex-1">{language.value === 'eng' ? 'English' : 'Kinyarwanda'}</span>
                {currentLanguage === language.value && (
                  <span className="ml-1 text-blue-500 text-xs md:ml-2 md:text-sm">✓</span>
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