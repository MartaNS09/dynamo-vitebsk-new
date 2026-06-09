import { blogPosts } from "@/data/blog-posts";
import { SportSection } from "@/types/sport-section.types";
import { SearchResult } from "./types";

function getServerApiBaseUrl(): string {
  const base =
    process.env.API_URL_SERVER ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://127.0.0.1:4000";
  return base.replace(/\/+$/, "");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query);
}

function pushUnique(results: SearchResult[], item: SearchResult) {
  if (!results.some((entry) => entry.url === item.url && entry.title === item.title)) {
    results.push(item);
  }
}

async function fetchSections(): Promise<SportSection[]> {
  try {
    const res = await fetch(`${getServerApiBaseUrl()}/sections`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const STATIC_PAGES: Array<{
  title: string;
  description: string;
  url: string;
  keywords: string[];
}> = [
  {
    title: "Главная страница",
    description: "Официальный сайт СДЮШОР Динамо Витебск",
    url: "/",
    keywords: ["главная", "домашняя", "динамо", "школа"],
  },
  {
    title: "История школы",
    description: "История создания и развития СДЮШОР Динамо Витебск",
    url: "/history",
    keywords: ["история", "создание", "развитие"],
  },
  {
    title: "Тренерский состав",
    description: "Профессиональные тренеры школы",
    url: "/trainers",
    keywords: ["тренеры", "преподаватели", "состав"],
  },
  {
    title: "Спортивные секции",
    description: "Все спортивные секции школы",
    url: "/sports",
    keywords: ["секции", "спорт", "кружки", "занятия"],
  },
  {
    title: "Аренда залов",
    description: "Аренда спортивных залов и инвентаря",
    url: "/rental",
    keywords: ["аренда", "зал", "прокат", "инвентарь"],
  },
  {
    title: "Запись в секции",
    description: "Онлайн-запись в спортивные секции",
    url: "/enrollment",
    keywords: ["запись", "записаться", "анкета"],
  },
  {
    title: "Администрация",
    description: "Руководство спортивной школы",
    url: "/administration",
    keywords: ["администрация", "руководство", "директор"],
  },
  {
    title: "Блог и новости",
    description: "Новости, события и достижения школы",
    url: "/blog",
    keywords: ["блог", "новости", "события"],
  },
  {
    title: "Отделения",
    description: "Спортивные отделения и направления",
    url: "/departments",
    keywords: ["отделения", "направления"],
  },
  {
    title: "Политика конфиденциальности",
    description: "Политика обработки персональных данных",
    url: "/privacy",
    keywords: ["политика", "конфиденциальность", "данные"],
  },
];

export async function runSiteSearch(rawQuery: string): Promise<SearchResult[]> {
  const query = rawQuery.trim().toLowerCase();
  if (query.length < 2) return [];

  const results: SearchResult[] = [];
  const sections = await fetchSections();

  for (const section of sections) {
    const name = section.name || "";
    const shortDescription = section.shortDescription || "";
    const fullDescription = stripHtml(section.fullDescription || "");

    if (
      matchesQuery(name, query) ||
      matchesQuery(shortDescription, query) ||
      matchesQuery(fullDescription, query) ||
      matchesQuery(section.category || "", query)
    ) {
      pushUnique(results, {
        id: section.id,
        title: section.name,
        description: (shortDescription || fullDescription).slice(0, 150),
        url: `/sports/${section.slug}`,
        type: "section",
        category: "Спортивная секция",
        icon: "🏃",
      });
    }

    for (const trainer of section.trainers || []) {
      const trainerText = [
        trainer.name,
        trainer.position,
        trainer.description,
      ]
        .filter(Boolean)
        .join(" ");

      if (matchesQuery(trainerText, query)) {
        pushUnique(results, {
          id: trainer.id,
          title: trainer.name,
          description: `${trainer.position || "Тренер"} — ${section.name}`.slice(
            0,
            150,
          ),
          url: `/enrollment?section=${encodeURIComponent(section.slug)}&trainerId=${encodeURIComponent(trainer.id)}`,
          type: "trainer",
          category: "Тренер",
          icon: "👨‍🏫",
        });
      }
    }

    for (const abonement of section.abonements || []) {
      const abonementText = [
        abonement.name,
        abonement.description,
        String(abonement.price),
      ].join(" ");

      if (matchesQuery(abonementText, query)) {
        pushUnique(results, {
          id: abonement.id,
          title: `${abonement.name} — ${section.name}`,
          description: `${abonement.price} ${abonement.currency} — ${(abonement.description || "").slice(0, 100)}`,
          url: `/enrollment?section=${encodeURIComponent(section.slug)}&abonement=${encodeURIComponent(abonement.id)}`,
          type: "abonement",
          category: "Абонемент",
          icon: "💳",
        });
      }
    }
  }

  for (const post of blogPosts) {
    const plainContent = stripHtml(post.content || "");
    const haystack = [post.title, post.excerpt, plainContent, ...(post.tags || [])]
      .join(" ");

    if (matchesQuery(haystack, query)) {
      pushUnique(results, {
        id: post.id,
        title: post.title,
        description: (post.excerpt || plainContent).slice(0, 150),
        url: `/blog/${post.slug}`,
        type: "blog",
        category: "Новость",
        icon: "📰",
      });
    }
  }

  for (const page of STATIC_PAGES) {
    const title = page.title.toLowerCase();
    const desc = page.description.toLowerCase();
    const keywordHit = page.keywords.some((kw) => kw.includes(query) || query.includes(kw));

    if (title.includes(query) || desc.includes(query) || keywordHit) {
      pushUnique(results, {
        id: `page-${page.url}`,
        title: page.title,
        description: page.description,
        url: page.url,
        type: "page",
        category: "Страница сайта",
        icon: "📄",
      });
    }
  }

  results.sort((a, b) => {
    const aTitle = a.title.toLowerCase();
    const bTitle = b.title.toLowerCase();
    const aExact = aTitle === query ? 1 : 0;
    const bExact = bTitle === query ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    const aStarts = aTitle.startsWith(query) ? 0 : 1;
    const bStarts = bTitle.startsWith(query) ? 0 : 1;
    return aStarts - bStarts;
  });

  return results;
}
