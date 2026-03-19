// Data pro slovní druhy a druhy vět

// Slovní druhy podle typu
export const wordsByType = {
  'podstatné jméno': [
    'pes', 'kočka', 'stůl', 'židle', 'škola', 'kniha', 'tužka', 'sešit',
    'domů', 'strom', 'květina', 'slunce', 'voda', 'jídlo', 'mama', 'tatínek',
    'bratr', 'sestra', 'kamarád', 'učitel', 'ředitel', 'třída', 'tabule',
    'okno', 'dveře', 'podlaha', 'stěna', 'střecha', 'zahrada', 'park',
    'město', 'vesnice', 'ulice', 'auto', 'vlak', 'letadlo', 'loď', 'kolo',
    'míč', 'hračka', 'počítač', 'telefon', 'televize', 'rádio', 'hodiny',
    'kalendář', 'obraz', 'fotka', 'lev', 'tygr', 'slon', 'žirafa', 'medvěd',
    'vlk', 'liška', 'zajíc', 'ježek', 'veverka', 'pták', 'ryba', 'motýl',
    'včela', 'mravenec', 'hlemýžď', 'žába', 'ještěrka', 'had', 'želva',
  ],
  'sloveso': [
    'běží', 'leží', 'sedí', 'stojí', 'spí', 'jí', 'pije', 'čte',
    'píše', 'kreslí', 'počítá', 'mluví', 'zpívá', 'tancuje', 'skáče',
    'plave', 'létá', 'jezdí', 'chodí', 'běhá', 'pracuje', 'hraje',
    'učí se', 'vyučuje', 'pomáhá', 'uklízí', 'vaří', 'peče', 'myje',
    'čistí', 'opravuje', 'staví', 'maluje', 'řezá', 'lepí', 'šije',
    'plete', 'háčkuje', 'borduje', 'vyšívá', 'čte', 'poslouchá',
    'sleduje', 'díva se', 'směje se', 'pláče', 'křičí', 'šeptá',
    'volá', 'odpovídá', 'zeptá se', 'řekne', 'napíše', 'pošle',
    'dostane', 'najde', 'ztratí', 'hledá', 'čeká', 'přijde', 'odejde',
  ],
  'přídavné jméno': [
    'velký', 'malý', 'velká', 'malá', 'velké', 'malé',
    'krásný', 'krásná', 'krásné', 'hezký', 'hezká', 'hezké',
    'mladý', 'starý', 'nový', 'starý', 'dlouhý', 'krátký',
    'vysoký', 'nízký', 'široký', 'úzký', 'tlustý', 'tenký',
    'těžký', 'lehký', 'rychlý', 'pomalý', 'silný', 'slabý',
    'dobrý', 'zlý', 'hodný', 'ne hodný', 'chytrý', 'hloupý',
    'veselý', 'smutný', 'laskavý', 'přísný', 'milý', 'nemilý',
    'čistý', 'špinavý', 'studený', 'teplý', 'horký', 'studený',
    'sladký', 'slaný', 'kyselý', 'hořký', 'červený', 'modrý',
    'zelený', 'žlutý', 'bílý', 'černý', 'hnědý', 'šedý',
    'šťastný', 'unavený', 'nemocný', 'zdravý', 'bohatý', 'chudý',
  ],
  'zájmeno': [
    'já', 'ty', 'on', 'ona', 'ono', 'my', 'vy', 'oni', 'ony', 'ona',
    'mne', 'mě', 'tebe', 'tě', 'jeho', 'ho', 'ji', 'nás', 'vás', 'je',
    'můj', 'tvůj', 'jeho', 'její', 'náš', 'váš', 'jejich',
    'můj', 'moje', 'tvůj', 'tvoje', 'náš', 'naše', 'váš', 'vaše',
    'ten', 'ta', 'to', 'ti', 'ty', 'ta',
    'tento', 'tato', 'toto', 'tenhle', 'tahle', 'tohle',
    'tamten', 'tamta', 'tamto', 'onen', 'ona', 'ono',
    'kdosi', 'někdo', 'nikdo', 'něco', 'nic', 'všechno', 'vše',
    'každý', 'každá', 'každé', 'sám', 'sama', 'samo',
    'sebe', 'se', 'svůj', 'svá', 'své',
  ],
  'číslovka': [
    'jeden', 'jedna', 'jedno', 'dva', 'dvě', 'tři', 'čtyři', 'pět',
    'šest', 'sedm', 'osm', 'devět', 'deset', 'jedenáct', 'dvanáct',
    'dvacet', 'třicet', 'čtyřicet', 'padesát', 'šedesát', 'sedmdesát',
    'osmdesát', 'devadesát', 'sto', 'tisíc',
    'první', 'druhý', 'třetí', 'čtvrtý', 'pátý', 'šestý', 'sedmý',
    'osmý', 'devátý', 'desátý', 'jedenáctý', 'dvanáctý',
    'jednou', 'dvakrát', 'třikrát', 'čtyřikrát', 'pětkrát',
    'málo', 'mnoho', 'několik', 'kolik', 'tolik', 'žádný',
  ],
  'předložka': [
    'v', 've', 'na', 'o', 'po', 'do', 'z', 'ze', 'za', 'před',
    'pod', 'nad', 'mezi', 'přes', 'skrz', 'k', 'ke', 'od', 'pro',
    'bez', 'kromě', 'mimo', 'proti', 'podle', 'kolem', 'při',
    'u', 'vedle', 'před', 'za', 'mezi', 'nad', 'pod',
  ],
  'spojka': [
    'a', 'i', 'ale', 'nebo', 'protože', 'když', 'že', 'jestli',
    'pokud', 'aby', 'ač', 'ačkoli', 'proto', 'tudíž', 'neboť',
    'než', 'nežli', 'jako', 'tak', 'také', 'takže', 'protože',
    'ani', 'aniž', 'sotva', 'jakmile', 'jak', 'což', 'který',
  ],
  'citoslovce': [
    'au', 'auů', 'bůů', 'héj', 'húú', 'ach', 'hmm', 'pše',
    'mňau', 'haf', 'hau', 'kvák', 'kvákání', 'hudry', 'mlok',
    'cuc', 'mlask', 'prásk', 'bác', 'búm', 'bum', 'prsk',
    'hops', 'hop', 'skák', 'leze', 'plác', 'bác', 'ťuk',
    'bouch', 'cvak', 'křup', 'švih', 'fič', 'vítr', 'šum',
    'bruč', 'mruč', 'zuf', 'chrocht', 'kvílí', 'běduje',
    'hurá', 'juchů', 'sláva', 'živě', 'joy', 'smích', 'hi',
    'ha', 'hele', 'podívej', 'pst', 'ticho', 'ššš',
  ],
};

// Věty podle druhu
export const sentencesByType = {
  'oznamovací': [
    'Dnes je krásný den.',
    'Škola začíná v osm hodin.',
    'Mám rád matematiku.',
    'Pes běží po louce.',
    'Mama vaří oběd.',
    'V zahradě rostou květiny.',
    'Můj kamarád bydlí vedle.',
    'Auto stojí před domem.',
    'Včera pršelo.',
    'Zítra půjdeme do kina.',
    'Kniha leží na stole.',
    'Děti hrají fotbal.',
    'Ptáci zpívají na stromě.',
    'Voda v řece je studená.',
    'Náš pes se jmenuje Rex.',
    'Ve škole máme nového žáka.',
    'Tatínek čte noviny.',
    'Sestra hraje na klavír.',
    'Jíme oběd v poledne.',
    'Slunce svítí na obloze.',
    'Stromy mají zelené listy.',
    'Kolo stojí v garáži.',
    'Mám doma kočku.',
    'V lednici je mléko.',
    'Vikend bude hezký.',
  ],
  'tázací': [
    'Kde je má kniha?',
    'Co děláš?',
    'Kdy začíná škola?',
    'Jak se máš?',
    'Proč pláčeš?',
    'Kdo to řekl?',
    'Kam jdeš?',
    'Odkud jsi?',
    'Kolik je hodin?',
    'Jak se to jmenuje?',
    'Máš doma psa?',
    'Chceš s námi jít?',
    'Umíš plavat?',
    'Kde bydlíš?',
    'Co máš rád?',
    'Proč se směješ?',
    'Kdo ti to dal?',
    'Kdy přijedeš?',
    'Jak dlouho to trvá?',
    'Můžu ti pomoci?',
    'Víš, kde to je?',
    'Která kniha je tvoje?',
    'Čí je to pero?',
    'Líbí se ti to?',
    'Budeš zítra ve škole?',
  ],
  'rozkazovací': [
    'Přines mi knihu!',
    'Zavři dveře!',
    'Přečti si to!',
    'Napiš úkol!',
    'Neplač!',
    'Běž domů!',
    'Pomoz mi!',
    'Poslouchej mě!',
    'Sedni si!',
    'Vstaň!',
    'Umyj si ruce!',
    'Neutekej!',
    'Buď ticho!',
    'Dej si to!',
    'Nech toho!',
    'Uklidni se!',
    'Přestaň s tím!',
    'Jdi spát!',
    'Oblékni se!',
    'Jez zdravě!',
    'Nezapomeň na úkol!',
    'Pozdrav paní učitelku!',
    'Běž pomalu!',
    'Dávej pozor!',
    'Nelezej tam!',
  ],
  'přací': [
    'Abych byl zdráv!',
    'Kéž by pršelo!',
    'Aby se ti dařilo!',
    'Kéž by bylo léto!',
    'Abych měl více času!',
    'Kéž bych uměl létat!',
    'Aby byl svět v klidu!',
    'Kéž by všichni byli šťastní!',
    'Aby ses uzdravil!',
    'Kéž bych vyhrál!',
    'Abych měl nové kolo!',
    'Kéž by škola skončila!',
    'Aby přišel brzy!',
    'Kéž by nebyla zima!',
    'Aby se nám to povedlo!',
    'Kéž bych měl psa!',
    'Aby bylo všechno dobře!',
    'Kéž by nikdo nebyl nemocný!',
    'Abych byl bohatý!',
    'Kéž by měli všichni jídlo!',
    'Aby se ti splnil sen!',
    'Kéž by bylo více parků!',
    'Abych byl silnější!',
    'Kéž by všichni měli domov!',
    'Aby se svět zlepšil!',
  ],
};

// Získání náhodného slova daného typu
export function getRandomWordOfType(type: string): string {
  const words = wordsByType[type as keyof typeof wordsByType];
  if (!words || words.length === 0) return '';
  return words[Math.floor(Math.random() * words.length)];
}

// Získání náhodného slova z jakéhokoli typu
export function getRandomWord(): { word: string; type: string } {
  const types = Object.keys(wordsByType);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const words = wordsByType[randomType as keyof typeof wordsByType];
  const randomWord = words[Math.floor(Math.random() * words.length)];
  return { word: randomWord, type: randomType };
}

// Získání náhodné věty daného typu
export function getRandomSentenceOfType(type: string): string {
  const sentences = sentencesByType[type as keyof typeof sentencesByType];
  if (!sentences || sentences.length === 0) return '';
  return sentences[Math.floor(Math.random() * sentences.length)];
}

// Získání náhodné věty z jakéhokoli typu
export function getRandomSentence(): { sentence: string; type: string } {
  const types = Object.keys(sentencesByType);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const sentences = sentencesByType[randomType as keyof typeof sentencesByType];
  const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
  return { sentence: randomSentence, type: randomType };
}

// Získání všech slovních druhů
export function getAllWordTypes(): string[] {
  return Object.keys(wordsByType);
}

// Získání základních slovních druhů pro 3. třídu
export function getBasicWordTypes(): string[] {
  return ['podstatné jméno', 'sloveso', 'přídavné jméno'];
}

// Získání všech druhů vět
export function getAllSentenceTypes(): string[] {
  return Object.keys(sentencesByType);
}

// Funkce pro získání slovního druhu slova
export function getWordType(word: string): string | null {
  for (const [type, words] of Object.entries(wordsByType)) {
    if (words.includes(word.toLowerCase())) {
      return type;
    }
  }
  return null;
}

// Funkce pro získání druhu věty
export function getSentenceType(sentence: string): string | null {
  for (const [type, sentences] of Object.entries(sentencesByType)) {
    if (sentences.includes(sentence)) {
      return type;
    }
  }
  return null;
}
