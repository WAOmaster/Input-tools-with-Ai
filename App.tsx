import React, { useState } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { Editor } from './components/Editor';
import { SUPPORTED_LANGUAGES } from './constants';
import { InputMode, Language } from './types';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]); // Default to Hindi
  const [inputMode, setInputMode] = useState<InputMode>(InputMode.TRANSLITERATION);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-slate-800">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
                <i className="fas fa-globe text-sm"></i>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                Gemini Input Tools
              </h1>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="hidden md:inline"><i className="fab fa-firefox-browser text-orange-500 mr-1"></i> Firefox Compatible</span>
                <span className="hidden md:inline">|</span>
                <span className="hidden md:inline"><i className="fab fa-chrome text-green-500 mr-1"></i> Chrome</span>
                 <span className="hidden md:inline">|</span>
                <span className="hidden md:inline"><i className="fab fa-safari text-blue-400 mr-1"></i> Safari</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
          />

          <div className="flex items-center bg-gray-100 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => setInputMode(InputMode.TRANSLITERATION)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                inputMode === InputMode.TRANSLITERATION 
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-keyboard"></i>
              Phonetic Typing
            </button>
            <button
              onClick={() => setInputMode(InputMode.TRANSLATION)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                inputMode === InputMode.TRANSLATION 
                ? 'bg-white text-blue-700 shadow-sm ring-1 ring-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="fas fa-language"></i>
              Translate
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1">
          <Editor selectedLanguage={selectedLanguage} inputMode={inputMode} />
        </div>

        {/* Info Footer */}
        <div className="text-center text-gray-400 text-sm pb-8">
            <p className="mb-2">Powered by Google Gemini 2.5 Flash</p>
            <p className="text-xs">
              Works across all modern browsers. Does not require extensions.
            </p>
        </div>
      </main>
    </div>
  );
};

export default App;