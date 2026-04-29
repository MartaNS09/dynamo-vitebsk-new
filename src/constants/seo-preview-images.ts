export const DEFAULT_OG_IMAGE_BY_PAGE_ID: Record<string, string> = {
  home: "/images/hero/sports.jpg",
  about: "/images/hero/dymamo.jpg",
  history: "/images/hero/dymamo.jpg",
  trainers: "/images/trainers/Kickboxing-Klyshin.jpg",
  contacts: "/images/hero/dymamo.jpg",
  sports: "/images/sections/kickboxing-1.jpg",
  "sports-single": "/images/sections/kickboxing-1.jpg",
  departments: "/images/departments/athletics-hero.jpg",
  "departments-single": "/images/departments/athletics-hero.jpg",
  blog: "/images/blog/ski-competition-1.jpg",
  "blog-single": "/images/blog/ski-competition-1.jpg",
  enrollment: "/images/hero/sports.jpg",
  rental: "/images/hero/gymnastics.jpg",
  privacy: "/images/hero/dymamo.jpg",
  login: "/images/hero/dymamo.jpg",
  "404": "/images/hero/sports.jpg",
};

export const DEFAULT_OG_IMAGE_BY_PATH_PREFIX: Array<{
  prefix: string;
  image: string;
}> = [
  { prefix: "/", image: "/images/hero/sports.jpg" },
  { prefix: "/home", image: "/images/hero/sports.jpg" },
  { prefix: "/history", image: "/images/hero/dymamo.jpg" },
  { prefix: "/about", image: "/images/hero/dymamo.jpg" },
  { prefix: "/contacts", image: "/images/hero/dymamo.jpg" },
  { prefix: "/departments", image: "/images/departments/athletics-hero.jpg" },
  { prefix: "/sports", image: "/images/sections/kickboxing-1.jpg" },
  { prefix: "/trainers", image: "/images/trainers/Kickboxing-Klyshin.jpg" },
  { prefix: "/blog", image: "/images/blog/ski-competition-1.jpg" },
  { prefix: "/enrollment", image: "/images/hero/sports.jpg" },
  { prefix: "/rental", image: "/images/hero/gymnastics.jpg" },
];

export const DEFAULT_OG_IMAGE_FALLBACK = "/images/hero/sports.jpg";
