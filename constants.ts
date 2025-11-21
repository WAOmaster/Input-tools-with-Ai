import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', script: 'Arabic' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', script: 'Cyrillic' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', script: 'Greek' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', script: 'Kanji/Kana' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', script: 'Hanzi' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', script: 'Hanzi' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', script: 'Hebrew' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', script: 'Sinhala' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', script: 'Arabic' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', script: 'Ge\'ez' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', script: 'Cyrillic' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', script: 'Thai' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', script: 'Hangul' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', script: 'Cyrillic' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', script: 'Latin (VNI/Telex)' }
];

export const DEBOUNCE_DELAY_MS = 600;

export const PLACEHOLDERS = {
  TRANSLITERATION: "Type phonetically using Latin characters... (e.g., 'Namaste' -> 'नमस्ते')",
  TRANSLATION: "Type a sentence to translate..."
};