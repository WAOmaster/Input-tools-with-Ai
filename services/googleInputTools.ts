/**
 * Service to interact with Google Input Tools API.
 * This API provides high-accuracy, real-time phonetic transliteration.
 */

export const fetchTransliteration = async (
  sourceText: string,
  inputCode: string
): Promise<string> => {
  if (!sourceText.trim()) return '';

  try {
    // Using the standard Input Tools endpoint used by the web demo
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(
      sourceText
    )}&itc=${inputCode}&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // Response format: ["SUCCESS", [[original_text, [suggestions...], ...], ...]]
    if (data[0] === 'SUCCESS' && data[1]) {
        // Map over each segment and pick the first suggestion
        return data[1].map((segment: any) => {
            const suggestions = segment[1];
            // If suggestions exist, return the first one (best match)
            // Otherwise fall back to the original text component
            return suggestions && suggestions.length > 0 ? suggestions[0] : segment[0];
        }).join('');
    }
    
    return sourceText; // Fallback to original if structure is unexpected
  } catch (error) {
    console.error("Google Input Tools API Error:", error);
    throw error;
  }
};