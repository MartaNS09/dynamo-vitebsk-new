'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Loader2 } from 'lucide-react';

const typeColors = {
  section: 'bg-blue-50 text-blue-700 border-blue-200',
  blog: 'bg-green-50 text-green-700 border-green-200',
  trainer: 'bg-purple-50 text-purple-700 border-purple-200',
  abonement: 'bg-orange-50 text-orange-700 border-orange-200',
  page: 'bg-gray-50 text-gray-700 border-gray-200',
};

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query && query.trim().length >= 2) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(setResults)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [query]);

  if (query.length < 2) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">Введите запрос</h2>
        <p className="text-gray-400 text-sm mt-2">Минимум 2 символа для поиска</p>
        <div className="mt-8">
          <p className="text-gray-500 text-sm mb-3">Популярные запросы:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['гимнастика', 'футбол', 'тренеры', 'абонементы', 'история', 'администрация'].map(term => (
              <Link
                key={term}
                href={`/search?q=${term}`}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-10 h-10 mx-auto text-blue-500 animate-spin" />
        <p className="text-gray-500 mt-3">Поиск...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Ничего не найдено</h2>
        <p className="text-gray-400">По запросу <strong className="text-gray-600">"{query}"</strong></p>
        <p className="text-gray-400 text-sm mt-4">Попробуйте изменить или сократить запрос</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 pb-3 border-b border-gray-100">
        <p className="text-gray-500 text-sm">
          Найдено <strong className="text-blue-600">{results.length}</strong> результатов
          <span className="text-gray-400"> по запросу "{query}"</span>
        </p>
      </div>

      <div className="space-y-3">
        {results.map((result, idx) => (
          <Link
            key={`${result.type}-${result.id}-${idx}`}
            href={result.url}
            className="block bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group"
          >
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{result.icon || '📌'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[result.type as keyof typeof typeColors] || typeColors.page}`}>
                      {result.category}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-blue-600 group-hover:text-blue-700">
                    {result.title}
                  </h3>
                  {result.description && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800">Поиск по сайту</h1>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <Suspense fallback={<div className="text-center py-10"><Loader2 className="w-8 h-8 mx-auto text-blue-500 animate-spin" /></div>}>
            <SearchContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
