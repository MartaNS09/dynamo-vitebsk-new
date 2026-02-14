export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  lastLogin: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthContextType {
  user: AdminUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalSections: number;
  activeSections: number;
  totalBlogPosts: number;
  totalVisitors: number;
  pendingApplications: number;
  monthlyStats: MonthlyStat[];
}

export interface MonthlyStat {
  name: string;
  sections: number;
  posts: number;
  visitors?: number;
  applications?: number;
}

export interface ActivityLog {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  entity: "section" | "blog" | "user" | "application";
  entityId: string;
  entityName: string;
  timestamp: string;
}

// Права доступа для каждой роли
export const RolePermissions = {
  SUPER_ADMIN: {
    dashboard: true,
    sections: { view: true, create: true, edit: true, delete: true },
    blog: { view: true, create: true, edit: true, delete: true },
    users: { view: true, create: true, edit: true, delete: true },
    applications: { view: true, create: true, edit: true, delete: true },
    seo: { view: true, create: true, edit: true, delete: true },
    settings: true,
  },
  ADMIN: {
    dashboard: true,
    sections: { view: true, create: true, edit: true, delete: false },
    blog: { view: true, create: true, edit: true, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    applications: { view: true, create: false, edit: true, delete: false },
    seo: { view: false, create: false, edit: false, delete: false },
    settings: false,
  },
  EDITOR: {
    dashboard: true,
    sections: { view: true, create: false, edit: false, delete: false },
    blog: { view: true, create: true, edit: true, delete: false },
    users: { view: false, create: false, edit: false, delete: false },
    applications: { view: false, create: false, edit: false, delete: false },
    seo: { view: false, create: false, edit: false, delete: false },
    settings: false,
  },
} as const;

export type RoleType = keyof typeof RolePermissions;
