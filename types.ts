export interface Language {
  code: string;
  name: string;
  nativeName: string;
  script: string;
}

export enum InputMode {
  TRANSLITERATION = 'TRANSLITERATION',
  TRANSLATION = 'TRANSLATION'
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
}