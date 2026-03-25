export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query || query.trim().length < 2) {
    return Response.json([]);
  }

  const searchQuery = query.trim().toLowerCase();
  const results = [];

  try {
    // 1. ПОИСК ПО СЕКЦИЯМ
    const sectionsRes = await fetch('http://localhost:3001/sections');
    if (sectionsRes.ok) {
      const sections = await sectionsRes.json();
      for (const section of sections) {
        const name = (section.name || '').toLowerCase();
        const shortDesc = (section.shortDescription || '').toLowerCase();
        const fullDesc = (section.fullDescription || '').toLowerCase();
        
        if (name.includes(searchQuery) || shortDesc.includes(searchQuery) || fullDesc.includes(searchQuery)) {
          results.push({
            id: section.id,
            title: section.name,
            description: (section.shortDescription || section.fullDescription || '').slice(0, 150),
            url: `/sports/${section.slug}`,
            type: 'section',
            category: 'Спортивная секция',
            icon: '🏃'
          });
        }
      }
    }

    // 2. ПОИСК ПО БЛОГУ/НОВОСТЯМ
    const blogRes = await fetch('http://localhost:3001/blog');
    if (blogRes.ok) {
      const blog = await blogRes.json();
      for (const post of blog) {
        const title = (post.title || '').toLowerCase();
        const excerpt = (post.excerpt || '').toLowerCase();
        const content = (post.content || '').toLowerCase();
        
        if (title.includes(searchQuery) || excerpt.includes(searchQuery) || content.includes(searchQuery)) {
          results.push({
            id: post.id,
            title: post.title,
            description: (post.excerpt || '').slice(0, 150),
            url: `/blog/${post.slug}`,
            type: 'blog',
            category: 'Новость',
            icon: '📰'
          });
        }
      }
    }

    // 3. ПОИСК ПО ТРЕНЕРАМ
    const trainersRes = await fetch('http://localhost:3001/trainers');
    if (trainersRes.ok) {
      const trainers = await trainersRes.json();
      for (const trainer of trainers) {
        const name = (trainer.name || '').toLowerCase();
        const position = (trainer.position || '').toLowerCase();
        const description = (trainer.description || '').toLowerCase();
        
        if (name.includes(searchQuery) || position.includes(searchQuery) || description.includes(searchQuery)) {
          results.push({
            id: trainer.id,
            title: trainer.name,
            description: `${trainer.position || 'Тренер'} - ${(trainer.description || '').slice(0, 100)}`,
            url: `/trainers`,
            type: 'trainer',
            category: 'Тренерский состав',
            icon: '👨‍🏫'
          });
        }
      }
    }

    // 4. ПОИСК ПО АБОНЕМЕНТАМ
    const abonementsRes = await fetch('http://localhost:3001/abonements');
    if (abonementsRes.ok) {
      const abonements = await abonementsRes.json();
      for (const abonement of abonements) {
        const name = (abonement.name || '').toLowerCase();
        const description = (abonement.description || '').toLowerCase();
        
        if (name.includes(searchQuery) || description.includes(searchQuery)) {
          results.push({
            id: abonement.id,
            title: abonement.name,
            description: `${abonement.price} BYN - ${(abonement.description || '').slice(0, 100)}`,
            url: `/abonements`,
            type: 'abonement',
            category: 'Абонемент',
            icon: '💳'
          });
        }
      }
    }

    // 5. СТАТИЧЕСКИЕ СТРАНИЦЫ (полный список)
    const staticPages = [
      { title: 'Главная страница', description: 'Официальный сайт СДЮШОР Динамо Витебск', url: '/', keywords: ['главная', 'домашняя', 'динамо'] },
      { title: 'О школе', description: 'История и традиции спортивной школы Динамо Витебск', url: '/about', keywords: ['о школе', 'обучение', 'традиции', 'динамо', 'спортивная школа'] },
      { title: 'История школы', description: 'История создания и развития СДЮШОР Динамо Витебск', url: '/history', keywords: ['история', 'создание', 'развитие', 'прошлое', 'основание'] },
      { title: 'Тренерский состав', description: 'Наши профессиональные тренеры и их достижения', url: '/trainers', keywords: ['тренеры', 'преподаватели', 'состав', 'инструкторы', 'педагоги'] },
      { title: 'Спортивные секции', description: 'Все спортивные секции школы: гимнастика, футбол, кикбоксинг и другие', url: '/sports', keywords: ['секции', 'спорт', 'кружки', 'занятия'] },
      { title: 'Абонементы и цены', description: 'Стоимость абонементов и условия посещения', url: '/abonements', keywords: ['абонементы', 'цены', 'стоимость', 'оплата', 'прайс'] },
      { title: 'Аренда залов', description: 'Аренда спортивных залов и инвентаря', url: '/rental', keywords: ['аренда', 'зал', 'инвентарь', 'снять', 'помещение'] },
      { title: 'Запись в секции', description: 'Записаться в спортивные секции онлайн', url: '/enrollment', keywords: ['запись', 'секции', 'записаться', 'вступить', 'анкета'] },
      { title: 'Прокат инвентаря', description: 'Прокат спортивного инвентаря и оборудования', url: '/rental', keywords: ['прокат', 'инвентарь', 'экипировка', 'форма'] },
      { title: 'Контакты', description: 'Как нас найти и связаться с администрацией', url: '/contacts', keywords: ['контакты', 'адрес', 'телефон', 'связь', 'администрация'] },
      { title: 'Администрация', description: 'Руководство и административный состав школы', url: '/administration', keywords: ['администрация', 'руководство', 'директор', 'сотрудники', 'управление'] },
      { title: 'Блог и новости', description: 'Новости, события и достижения школы', url: '/blog', keywords: ['блог', 'новости', 'события', 'достижения'] },
      { title: 'Отделения', description: 'Спортивные отделения и направления', url: '/departments', keywords: ['отделения', 'направления', 'виды спорта'] },
      { title: 'Статистика', description: 'Достижения и статистика школы', url: '/dashboard/statistics', keywords: ['статистика', 'достижения', 'результаты'] },
      { title: 'Политика конфиденциальности', description: 'Политика обработки персональных данных', url: '/privacy', keywords: ['политика', 'конфиденциальность', 'данные', 'персональные данные'] }
    ];

    for (const page of staticPages) {
      const title = page.title.toLowerCase();
      const desc = page.description.toLowerCase();
      const keywordsMatch = page.keywords.some(kw => kw.toLowerCase().includes(searchQuery));
      
      if (title.includes(searchQuery) || desc.includes(searchQuery) || keywordsMatch) {
        results.push({
          id: `page-${page.url}`,
          title: page.title,
          description: page.description,
          url: page.url,
          type: 'page',
          category: 'Страница сайта',
          icon: '📄'
        });
      }
    }

    // Убираем дубликаты и сортируем по релевантности
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.url === result.url)
    );
    
    // Сортировка: сначала точные совпадения в названии
    uniqueResults.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aExact = aTitle === searchQuery ? 1 : 0;
      const bExact = bTitle === searchQuery ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;
      return (aTitle.includes(searchQuery) ? 0 : 1) - (bTitle.includes(searchQuery) ? 0 : 1);
    });

    console.log(`✅ Найдено ${uniqueResults.length} результатов для "${searchQuery}"`);
    return Response.json(uniqueResults);
    
  } catch (error) {
    console.error('❌ Ошибка поиска:', error);
    return Response.json([]);
  }
}
