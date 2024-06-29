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