import { GoogleGenAI } from "@google/genai";
import { InputMode, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-2.5-flash';

export const processText = async (
  text: string,
  targetLanguage: Language,
  mode: InputMode
): Promise<string> => {
  if (!text || !text.trim()) return '';

  try {
    const systemInstruction = mode === InputMode.TRANSLITERATION
      ? `You are a strict transliteration engine (Input Method Editor).
         Your task is to convert the user's Latin/Roman script input phonetically into the ${targetLanguage.name} script (${targetLanguage.script}).
         
         Rules:
         1. PRESERVE newlines, punctuation, and spacing exactly.
         2. DO NOT translate the meaning unless the word is a standard English word that acts as a loan word or the user intends for it to be the word in that language. Prioritize phonetic mapping.
         3. E.g. if Target is Hindi and Input is "Mera naam", Output "मेरा नाम".
         4. E.g. if Target is Japanese and Input is "Tokyo", Output "東京".
         5. Return ONLY the converted text. No explanations.`
      : `You are a high-quality translator. Translate the following text into ${targetLanguage.name} (${targetLanguage.nativeName}). Preserve original formatting and tone. Return ONLY the translated text.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: text,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for deterministic transliteration
      }
    });

    return response.text?.trim() || '';
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};