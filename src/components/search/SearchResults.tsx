'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Loader2, FolderSearch, FileText, Newspaper } from 'lucide-react';
import { SearchResult, highlightText, getPreviewText } from '@/lib/search/searchUtils';

interface SearchResultsProps {
  query: string;
  onClose?: () => void;
}

const typeIcons = {
  section: FolderSearch,
  blog: Newspaper,
  page: FileText,
};

const typeLabels = {
  section: 'Секция',
  blog: 'Статья',
  page: 'Страница',
};

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query && query.trim().length >= 2) {
      performSearch();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Ошибка поиска');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Не удалось выполнить поиск');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (query.length < 2) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-500">Введите минимум 2 символа для поиска</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" />
        <p className="text-gray-500 mt-3">Поиск...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <X className="w-12 h-12 mx-auto text-red-400 mb-3" />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <p className="text-gray-600 mb-2">Ничего не найдено</p>
        <p className="text-gray-400 text-sm">По запросу "{query}"</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="mb-6 pb-4 border-b">
        <p className="text-gray-600">
          Найдено <strong className="text-blue-600">{results.length}</strong> результатов
          {query && <span> по запросу <strong className="text-gray-800">"{query}"</strong></span>}
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result) => {
          const Icon = typeIcons[result.type];
          return (
            <Link
              key={`${result.type}-${result.id}`}
              href={result.url}
              onClick={onClose}
              className="block p-5 bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                {result.image && (
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      {typeLabels[result.type]}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold text-blue-600 group-hover:text-blue-800 mb-2"
                    dangerouslySetInnerHTML={{ 
                      __html: result.highlight?.title || highlightText(result.title, query) 
                    }}
                  />
                  
                  <p 
                    className="text-gray-600 text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: result.highlight?.description || 
                              highlightText(getPreviewText(result.description, query), query)
                    }}
                  />
                  
                  <div className="mt-2 text-xs text-gray-400">
                    {result.url}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
