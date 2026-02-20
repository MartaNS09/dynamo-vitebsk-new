export interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  averageTime: number; // в секундах
  bounceRate: number; // процент отказов
  byDevice: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  bySource: {
    direct: number;
    search: number;
    social: number;
    referral: number;
  };
}

export interface ContentStats {
  totalPosts: number;
  totalSections: number;
  totalTrainers: number;
  totalAbonements: number;
  popularPosts: {
    id: string;
    title: string;
    views: number;
    slug: string;
  }[];
  popularSections: {
    id: string;
    name: string;
    views: number;
    slug: string;
  }[];
}

export interface ApplicationStats {
  total: number;
  byStatus: {
    new: number;
    inProgress: number;
    contacted: number;
    completed: number;
    cancelled: number;
  };
  conversionRate: number;
  averageResponseTime: number; // среднее время ответа в часах
  bySource: {
    enrollment_form: number;
    sport_section_page: number;
    abonement_page: number;
    other: number;
  };
}

export interface MonthlyStat {
  month: string; // "2026-01", "2026-02"
  visits: number;
  visitors: number;
  applications: number;
  posts: number;
}

export interface DashboardStats {
  visits: VisitStats;
  content: ContentStats;
  applications: ApplicationStats;
  monthly: MonthlyStat[];
  lastUpdated: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
  label:
    | "today"
    | "yesterday"
    | "week"
    | "month"
    | "quarter"
    | "year"
    | "custom";
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}
