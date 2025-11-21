import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full md:w-72" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
        Target Language
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      >
        <div className="flex flex-col items-start">
          <span className="font-medium text-gray-900">{selectedLanguage.name}</span>
          <span className="text-xs text-gray-500">{selectedLanguage.nativeName}</span>
        </div>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-96 flex flex-col animate-in fade-in zoom-in-95 duration-100">
          <div className="p-2 border-b border-gray-100 bg-gray-50">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search language..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors duration-150 ${selectedLanguage.code === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-sm">{lang.name}</span>
                  <span className="text-xs text-gray-400">{lang.nativeName}</span>
                </div>
                {selectedLanguage.code === lang.code && (
                  <i className="fas fa-check text-blue-600"></i>
                )}
              </button>
            ))}
            {filteredLanguages.length === 0 && (
              <div className="p-4 text-center text-gray-400 text-sm">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};