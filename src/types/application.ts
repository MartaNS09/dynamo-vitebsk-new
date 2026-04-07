// Базовый тип для статуса как объекта
export interface ApplicationStatusObject {
  id: string;
  name: string;
  label: string;
  color?: string;
  order?: number;
}

// Тип статуса: может быть строкой ИЛИ объектом
export type ApplicationStatus = string | ApplicationStatusObject;

// Хелпер-функции для работы со статусом
export const getStatusName = (status: ApplicationStatus): string => {
  if (typeof status === "object" && status !== null) {
    return status.name;
  }
  return status;
};

export const getStatusLabel = (status: ApplicationStatus): string => {
  if (typeof status === "object" && status !== null) {
    return status.label || status.name;
  }
  return status;
};

export const getStatusColor = (status: ApplicationStatus): string => {
  if (typeof status === "object" && status !== null) {
    return status.color || "#6b7280";
  }
  return "#6b7280";
};

export type ApplicationSource =
  | "enrollment_form"
  | "sport_section_page"
  | "abonement_page"
  | "other"
  | "admin";

export interface Application {
  id: string;
  createdAt: string;
  updatedAt: string;

  name: string;
  phone: string;
  email?: string;

  childAge?: number;
  sport?: string;
  message?: string;

  selectedAbonement?: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };

  selectedTrainer?: {
    id: string;
    name: string;
    position: string;
  };

  paymentAccount?: string; // <---- ДОБАВЛЕНО

  source: ApplicationSource;
  sectionId?: string;
  sectionName?: string;

  status: ApplicationStatus;
  statusId?: string;
  statusHistory: StatusHistoryItem[];

  managerNotes?: ManagerNote[];

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
  status?: string;
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
