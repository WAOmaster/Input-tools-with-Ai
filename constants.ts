import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', googleInputCode: 'hi-t-i0-und' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', script: 'Arabic', googleInputCode: 'ar-t-i0-und' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', script: 'Cyrillic', googleInputCode: 'ru-t-i0-und' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', script: 'Greek', googleInputCode: 'el-t-i0-und' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', script: 'Kanji/Kana', googleInputCode: 'ja-t-i0-und' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', script: 'Hanzi', googleInputCode: 'zh-t-i0-pinyin' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', script: 'Hanzi', googleInputCode: 'zh-hant-t-i0-und' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', script: 'Hebrew', googleInputCode: 'he-t-i0-und' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', googleInputCode: 'sa-t-i0-und' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', googleInputCode: 'bn-t-i0-und' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', googleInputCode: 'ta-t-i0-und' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', googleInputCode: 'te-t-i0-und' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', googleInputCode: 'mr-t-i0-und' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', googleInputCode: 'gu-t-i0-und' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', googleInputCode: 'pa-t-i0-und' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', googleInputCode: 'ml-t-i0-und' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', googleInputCode: 'kn-t-i0-und' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', googleInputCode: 'ne-t-i0-und' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', script: 'Sinhala', googleInputCode: 'si-t-i0-und' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic', googleInputCode: 'ur-t-i0-und' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', script: 'Arabic', googleInputCode: 'fa-t-i0-und' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', script: 'Ge\'ez', googleInputCode: 'am-t-i0-und' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', script: 'Cyrillic', googleInputCode: 'sr-t-i0-und' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', script: 'Thai', googleInputCode: 'th-t-i0-und' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', script: 'Hangul', googleInputCode: 'ko-t-i0-und' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', script: 'Cyrillic', googleInputCode: 'uk-t-i0-und' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', script: 'Latin (VNI/Telex)', googleInputCode: 'vi-t-i0-und' }
];

export const DEBOUNCE_DELAY_MS = 300;

export const PLACEHOLDERS = {
  TRANSLITERATION: "Type phonetically using Latin characters... (e.g., 'Namaste' -> 'नमस्ते')",
  TRANSLATION: "Type a sentence to translate..."
};