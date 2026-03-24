// export type ApplicationStatus =
//   | "new"
//   | "in_progress"
//   | "contacted"
//   | "completed"
//   | "cancelled";
// export type ApplicationSource =
//   | "enrollment_form"
//   | "sport_section_page"
//   | "abonement_page"
//   | "other";

// export interface Application {
//   id: string;
//   createdAt: string;
//   updatedAt: string;

//   // Контактные данные
//   name: string;
//   phone: string;
//   email?: string;

//   // Данные о ребенке/записи
//   childAge?: number;
//   sport?: string;
//   message?: string;

//   // СВЯЗЬ С АБОНЕМЕНТОМ
//   selectedAbonement?: {
//     id: string;
//     name: string;
//     price: number;
//     duration: string;
//   };

//   // Откуда пришла заявка
//   source: ApplicationSource;
//   sectionId?: string;
//   sectionName?: string;

//   // Статус обработки
//   status: ApplicationStatus;
//   statusHistory: StatusHistoryItem[];

//   // Комментарии менеджера
//   managerNotes?: ManagerNote[];

//   // Кто обрабатывает
//   assignedTo?: string;
//   assignedToName?: string;
// }

// export interface StatusHistoryItem {
//   status: ApplicationStatus;
//   changedAt: string;
//   changedBy?: string;
//   changedByName?: string;
//   comment?: string;
// }

// export interface ManagerNote {
//   id: string;
//   text: string;
//   createdAt: string;
//   createdBy: string;
//   createdByName: string;
// }

// export interface ApplicationFilters {
//   status?: ApplicationStatus;
//   search?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   assignedTo?: string;
//   page?: number;
//   limit?: number;
// }

// export interface ApplicationStats {
//   total: number;
//   new: number;
//   inProgress: number;
//   contacted: number;
//   completed: number;
//   cancelled: number;
//   conversionRate: number;
// }

// src/types/application.ts

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
