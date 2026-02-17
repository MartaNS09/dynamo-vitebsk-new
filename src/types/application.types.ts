export type ApplicationStatus =
  | "new"
  | "in_progress"
  | "contacted"
  | "completed"
  | "cancelled";
export type ApplicationSource =
  | "enrollment_form"
  | "sport_section_page"
  | "abonement_page"
  | "other";

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Контактные данные
  name: string;
  phone: string;
  email?: string;

  // Данные о ребенке/записи
  childAge?: number;
  sport?: string;
  message?: string;

  // СВЯЗЬ С АБОНЕМЕНТОМ
  selectedAbonement?: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };

  // Откуда пришла заявка
  source: ApplicationSource;
  sectionId?: string;
  sectionName?: string;

  // Статус обработки
  status: ApplicationStatus;
  statusHistory: StatusHistoryItem[];

  // Комментарии менеджера
  managerNotes?: ManagerNote[];

  // Кто обрабатывает
  assignedTo?: string;
  assignedToName?: string;
}

export interface StatusHistoryItem {
  status: ApplicationStatus;
  changedAt: string;
  changedBy?: string;
  changedByName?: string;
  comment?: string;
}

export interface ManagerNote {
  id: string;
  text: string;
  createdAt: string;
  createdBy: string;
  createdByName: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  assignedTo?: string;
  page?: number;
  limit?: number;
}

export interface ApplicationStats {
  total: number;
  new: number;
  inProgress: number;
  contacted: number;
  completed: number;
  cancelled: number;
  conversionRate: number;
}
