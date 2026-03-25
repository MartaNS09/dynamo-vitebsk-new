// Утилиты для поиска

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'section' | 'blog' | 'page';
  image?: string;
  highlight?: {
    title?: string;
    description?: string;
  };
  score?: number;
}

// Функция для выделения найденных слов
export const highlightText = (text: string, query: string): string => {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
};

// Функция для вычисления релевантности
export const calculateRelevance = (text: string, query: string): number => {
  if (!query || !text) return 0;
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  
  // Точное совпадение в начале
  if (lowerText.startsWith(lowerQuery)) return 100;
  
  // Слово целиком
  if (lowerText.includes(` ${lowerQuery} `)) return 80;
  
  // Частичное совпадение
  let score = 0;
  const words = lowerQuery.split(' ');
  words.forEach(word => {
    if (lowerText.includes(word)) score += 10;
  });
  
  return Math.min(score, 100);
};

// Функция для сортировки результатов по релевантности
export const sortByRelevance = (results: SearchResult[], query: string): SearchResult[] => {
  return results
    .map(result => ({
      ...result,
      score: calculateRelevance(result.title, query) + 
             calculateRelevance(result.description, query) * 0.5
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));
};

// Функция для создания превью текста
export const getPreviewText = (text: string, query: string, maxLength: number = 160): string => {
  if (!text) return '';
  
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  
  if (index === -1) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
  
  const start = Math.max(0, index - 50);
  const end = Math.min(text.length, index + query.length + 100);
  let preview = text.slice(start, end);
  
  if (start > 0) preview = '...' + preview;
  if (end < text.length) preview = preview + '...';
  
  return preview;
};
