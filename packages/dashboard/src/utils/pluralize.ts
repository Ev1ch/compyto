/**
 * Returns the plural of an English word.
 * @see {@link https://stackoverflow.com/questions/27194359/javascript-pluralize-an-english-string | Stack Overflow}
 */
export default function plural(word: string, amount: number) {
  if (amount === 1) {
    return word;
  }

  const plural = {
    '(quiz)$': '$1zes',
    '^(ox)$': '$1en',
    '([m|l])ouse$': '$1ice',
    '(matr|vert|ind)ix|ex$': '$1ices',
    '(x|ch|ss|sh)$': '$1es',
    '([^aeiouy]|qu)y$': '$1ies',
    '(hive)$': '$1s',
    '(?:([^f])fe|([lr])f)$': '$1$2ves',
    '(shea|lea|loa|thie)f$': '$1ves',
    sis$: 'ses',
    '([ti])um$': '$1a',
    '(tomat|potat|ech|her|vet)o$': '$1oes',
    '(bu)s$': '$1ses',
    '(alias)$': '$1es',
    '(octop)us$': '$1i',
    '(ax|test)is$': '$1es',
    '(us)$': '$1es',
    '([^s]+)$': '$1s',
  };

  const irregular = {
    move: 'moves',
    foot: 'feet',
    goose: 'geese',
    sex: 'sexes',
    child: 'children',
    man: 'men',
    tooth: 'teeth',
    person: 'people',
  };

  const uncountable = [
    'sheep',
    'fish',
    'deer',
    'moose',
    'series',
    'species',
    'money',
    'rice',
    'information',
    'equipment',
    'bison',
    'cod',
    'offspring',
    'pike',
    'salmon',
    'shrimp',
    'swine',
    'trout',
    'aircraft',
    'hovercraft',
    'spacecraft',
    'sugar',
    'tuna',
    'you',
    'wood',
  ];

  if (uncountable.indexOf(word.toLowerCase()) >= 0) {
    return word;
  }

  for (const w in irregular) {
    const pattern = new RegExp(`${w}$`, 'i');
    const replace = irregular[w as keyof typeof irregular];

    if (pattern.test(word)) {
      return word.replace(pattern, replace);
    }
  }

  for (const reg in plural) {
    const pattern = new RegExp(reg, 'i');

    if (pattern.test(word)) {
      return word.replace(pattern, plural[reg as keyof typeof plural]);
    }
  }

  return word;
}
