/**
 * Auto-Blog Topics for Pisicopedia.ro
 * Topics for automatic article generation with OpenAI + Leonardo
 */

export interface AutoTopic {
  slug: string;
  title: string;
  category: 'symptoms' | 'diseases' | 'prevention' | 'behavior' | 'nutrition' | 'procedures';
  subcategory: string;
  priority: 'high' | 'medium' | 'low';
  keywords: string[];
  description: string;
}

// Priority topics for auto-generation
export const autoTopics: AutoTopic[] = [
  // HIGH PRIORITY - Common symptoms and concerns
  {
    slug: 'pisica-scuipa-par',
    title: 'De ce pisica mea scuipă păr? Ghid despre bile de păr',
    category: 'symptoms',
    subcategory: 'digestive',
    priority: 'high',
    keywords: ['bile păr', 'vomită păr', 'hairball', 'scuipă'],
    description: 'Articol despre bilele de păr la pisici, cauze și prevenție'
  },
  {
    slug: 'pisica-bea-multa-apa',
    title: 'Pisica bea multă apă: când să te îngrijorezi',
    category: 'symptoms',
    subcategory: 'general',
    priority: 'high',
    keywords: ['sete excesivă', 'polidipsie', 'bea apă', 'deshidratare'],
    description: 'Despre consumul excesiv de apă la pisici și cauzele posibile'
  },
  {
    slug: 'pisica-pierde-par',
    title: 'Pisica pierde păr excesiv: cauze și soluții',
    category: 'symptoms',
    subcategory: 'piele',
    priority: 'high',
    keywords: ['nărește', 'chelie', 'alopecie', 'pierdere păr'],
    description: 'Ghid despre pierderea excesivă de păr la pisici'
  },
  {
    slug: 'pisica-miauna-noaptea',
    title: 'De ce miaună pisica noaptea? Cauze și soluții',
    category: 'behavior',
    subcategory: 'probleme',
    priority: 'high',
    keywords: ['miaună', 'noapte', 'zgomot', 'comportament nocturn'],
    description: 'Despre miaunatul nocturn și cum să-l gestionezi'
  },
  {
    slug: 'pisica-zgarie-mobila',
    title: 'Cum să împiedici pisica să zgârie mobila',
    category: 'behavior',
    subcategory: 'educatie',
    priority: 'high',
    keywords: ['zgâriat', 'mobilă', 'canapea', 'dresaj'],
    description: 'Soluții pentru a preveni zgâriatul mobilei'
  },

  // MEDIUM PRIORITY - Health conditions
  {
    slug: 'pisica-conjunctivita',
    title: 'Conjunctivita la pisici: simptome și tratament',
    category: 'diseases',
    subcategory: 'ochi',
    priority: 'medium',
    keywords: ['ochi roșii', 'infecție ochi', 'lăcrimare', 'conjunctivită'],
    description: 'Ghid despre conjunctivita felină'
  },
  {
    slug: 'pisica-cistita',
    title: 'Cistita la pisici: recunoaștere și management',
    category: 'diseases',
    subcategory: 'urinare',
    priority: 'medium',
    keywords: ['cistită', 'urinare dureroasă', 'infecție urinară', 'FLUTD'],
    description: 'Despre cistita felină și managementul ei'
  },
  {
    slug: 'pisica-obezitate',
    title: 'Obezitatea la pisici: prevenție și dietă',
    category: 'nutrition',
    subcategory: 'management-greutate',
    priority: 'medium',
    keywords: ['obezitate', 'supraponderalitate', 'slăbire', 'dietă'],
    description: 'Ghid complet despre managementul greutății'
  },
  {
    slug: 'pisica-senioara-ingrijire',
    title: 'Îngrijirea pisicii senior: ghid complet',
    category: 'prevention',
    subcategory: 'senior',
    priority: 'medium',
    keywords: ['senior', 'bătrână', 'îngrijire', 'vârstnic'],
    description: 'Ghid pentru îngrijirea pisicilor în vârstă'
  },
  {
    slug: 'pisica-diaree',
    title: 'Diareea la pisici: cauze și ce să faci',
    category: 'symptoms',
    subcategory: 'digestive',
    priority: 'medium',
    keywords: ['diaree', 'scaun moale', 'probleme digestive', 'stomac'],
    description: 'Despre diaree la pisici și managementul acasă'
  },

  // LOW PRIORITY - Educational content
  {
    slug: 'pisica-hrana-umeda-vs-uscata',
    title: 'Hrană umedă vs hrană uscată pentru pisici',
    category: 'nutrition',
    subcategory: 'alegeri-nutritionale',
    priority: 'low',
    keywords: ['hrană umedă', 'hrană uscată', 'bobițe', 'conserve'],
    description: 'Comparație între tipurile de hrană pentru pisici'
  },
  {
    slug: 'pisica-jucarii-interactive',
    title: 'Cele mai bune jucării interactive pentru pisici',
    category: 'behavior',
    subcategory: 'imbogatire',
    priority: 'low',
    keywords: ['jucării', 'interactive', 'joacă', 'stimulare'],
    description: 'Ghid despre jucării interactive pentru pisici'
  },
  {
    slug: 'pisica-prima-vizita-veterinar',
    title: 'Prima vizită la veterinar: ce să aștepți',
    category: 'procedures',
    subcategory: 'consultatie',
    priority: 'low',
    keywords: ['veterinar', 'consultație', 'prima vizită', 'examinare'],
    description: 'Ghid pentru prima vizită la veterinar'
  },
  {
    slug: 'pisica-transportor',
    title: 'Cum să alegi transportorul perfect pentru pisică',
    category: 'prevention',
    subcategory: 'echipament',
    priority: 'low',
    keywords: ['transportor', 'cușcă transport', 'călătorie', 'carrier'],
    description: 'Ghid pentru alegerea transportorului'
  },
  {
    slug: 'pisica-adaptare-casa-noua',
    title: 'Adaptarea pisicii la o casă nouă',
    category: 'behavior',
    subcategory: 'adaptare',
    priority: 'low',
    keywords: ['mutare', 'casă nouă', 'adaptare', 'stres relocare'],
    description: 'Cum să ajuți pisica să se adapteze la o locuință nouă'
  }
];

// Get next topic for generation
export function getNextTopicForGeneration(existingArticleSlugs: string[]): AutoTopic | null {
  // Filter out topics that already have articles
  const availableTopics = autoTopics.filter(
    topic => !existingArticleSlugs.includes(topic.slug)
  );

  if (availableTopics.length === 0) {
    return null;
  }

  // Sort by priority (high > medium > low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  availableTopics.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Return the first available topic
  return availableTopics[0];
}

// Get topic by slug
export function getTopicBySlug(slug: string): AutoTopic | undefined {
  return autoTopics.find(topic => topic.slug === slug);
}

// Get all high priority topics
export function getHighPriorityTopics(): AutoTopic[] {
  return autoTopics.filter(topic => topic.priority === 'high');
}

// Check if a topic exists
export function topicExists(slug: string): boolean {
  return autoTopics.some(topic => topic.slug === slug);
}