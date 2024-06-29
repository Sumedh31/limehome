/**
 * Converts German characters with diacritical marks (umlauts and eszett) to their English equivalents.
 * @param text The input text containing German characters to be converted.
 * @returns The input text with German characters replaced by their English equivalents.
 */
export function convertGermanToEnglish(text: string): string {
    const germanToEnglishMap: { [key: string]: string } = {
      'ä': 'ae',
      'ö': 'oe',
      'ü': 'ue',
      'ß': 'ss',
      'Ä': 'Ae',
      'Ö': 'Oe',
      'Ü': 'Ue'
    };
  
    return text.replace(/[äöüßÄÖÜ]/g, char => germanToEnglishMap[char] || char);
  }