import React, { useState, useEffect } from 'react';
import { Language, InputMode, GenerationState } from '../types';
import { processText } from '../services/geminiService';
import { fetchTransliteration } from '../services/googleInputTools';
import { PLACEHOLDERS, DEBOUNCE_DELAY_MS } from '../constants';

interface EditorProps {
  selectedLanguage: Language;
  inputMode: InputMode;
}

export const Editor: React.FC<EditorProps> = ({ selectedLanguage, inputMode }) => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    error: null
  });
  
  // Custom debounce logic
  const [debouncedSourceText, setDebouncedSourceText] = useState(sourceText);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSourceText(sourceText);
    }, DEBOUNCE_DELAY_MS);

    return () => {
      clearTimeout(handler);
    };
  }, [sourceText, DEBOUNCE_DELAY_MS]);

  useEffect(() => {
    const performConversion = async () => {
      if (!debouncedSourceText) {
        setTargetText('');
        return;
      }

      setGenerationState({ isGenerating: true, error: null });

      try {
        let result = '';
        
        // Strategy: Use Google Input Tools API for Transliteration (faster, more accurate for phonetics)
        // Use Gemini for Translation (better understanding of meaning)
        if (inputMode === InputMode.TRANSLITERATION && selectedLanguage.googleInputCode) {
          try {
            result = await fetchTransliteration(debouncedSourceText, selectedLanguage.googleInputCode);
          } catch (err) {
            console.warn("Google Input Tools API failed, falling back to Gemini AI...", err);
            // Fallback to Gemini if Input Tools fails (e.g., network issues)
            result = await processText(debouncedSourceText, selectedLanguage, inputMode);
          }
        } else {
          // Default to Gemini for Translation or if no Input Code is available
          result = await processText(debouncedSourceText, selectedLanguage, inputMode);
        }

        setTargetText(result);
        setGenerationState({ isGenerating: false, error: null });
      } catch (error) {
        setGenerationState({ isGenerating: false, error: 'Failed to process text. Please check your connection.' });
      }
    };

    performConversion();
  }, [debouncedSourceText, selectedLanguage, inputMode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetText);
      // Optional: Show toast or feedback
      const btn = document.getElementById('copy-btn');
      if (btn) {
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check mr-2"></i>Copied!';
        setTimeout(() => btn.innerHTML = originalContent, 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTargetText('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-[600px] w-full max-w-6xl mx-auto p-1">
      {/* Source Input Pane */}
      <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-blue-100">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
            Input (Latin/English)
          </span>
          <button 
            onClick={handleClear}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <i className="fas fa-trash-alt"></i> Clear
          </button>
        </div>
        <textarea
          className="flex-1 w-full p-5 resize-none focus:outline-none text-lg text-gray-700 leading-relaxed bg-white placeholder-gray-300"
          placeholder={inputMode === InputMode.TRANSLITERATION ? PLACEHOLDERS.TRANSLITERATION : PLACEHOLDERS.TRANSLATION}
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          spellCheck={false}
        />
        <div className="px-4 py-2 bg-white text-xs text-gray-400 border-t border-gray-50 flex justify-between">
            <span>{sourceText.length} chars</span>
            <span>{generationState.isGenerating ? 'processing...' : 'ready'}</span>
        </div>
      </div>

      {/* Target Output Pane */}
      <div className="flex flex-col bg-blue-50/50 rounded-2xl shadow-lg border border-blue-100 overflow-hidden relative transition-all duration-300">
        <div className="bg-blue-100/50 px-4 py-3 border-b border-blue-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
              {selectedLanguage.name} Output
            </span>
             {generationState.isGenerating && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
             )}
          </div>
          <button
            id="copy-btn"
            onClick={handleCopy}
            disabled={!targetText}
            className={`text-xs font-medium px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
              !targetText 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'bg-white text-blue-600 hover:bg-blue-600 hover:text-white shadow-sm'
            }`}
          >
            <i className="fas fa-copy"></i> Copy
          </button>
        </div>
        
        <div className="flex-1 relative">
           {/* Loading Overlay or Empty State */}
           {!targetText && !generationState.isGenerating && !generationState.error && (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 pointer-events-none select-none">
                <i className="fas fa-language text-6xl mb-4 opacity-20"></i>
                <p>Output will appear here</p>
             </div>
           )}

           <textarea
            readOnly
            className={`w-full h-full p-5 resize-none focus:outline-none text-xl leading-relaxed bg-transparent
               ${generationState.isGenerating ? 'text-gray-400 animate-pulse-subtle' : 'text-gray-800'}
               font-['Noto_Sans_Arabic','Noto_Sans_Devanagari','Noto_Sans_JP','Noto_Sans_KR','Inter']`}
            value={targetText}
            placeholder=""
          />
        </div>
        
        {generationState.error && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-50 text-red-600 text-sm py-2 px-3 rounded-lg border border-red-100 flex items-center animate-bounce">
            <i className="fas fa-exclamation-circle mr-2"></i>
            {generationState.error}
          </div>
        )}
      </div>
    </div>
  );
};