"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { UserFilters as UserFiltersType } from "@/types/user.types";
import { UserRole } from "@/types/auth.types";
import { USER_ROLE_LABELS, USER_STATUS_OPTIONS } from "@/constants/users";
import styles from "./UserFilters.module.scss";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFilterChange: (filters: UserFiltersType) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value, page: 1 });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as UserRole | "all";
    onFilterChange({
      ...filters,
      role: value === "all" ? undefined : value,
      page: 1,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...filters,
      isActive: value === "all" ? undefined : value === "active",
      page: 1,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      page: 1,
      limit: filters.limit,
    });
  };

  const hasFilters =
    filters.search || filters.role || filters.isActive !== undefined;

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder="Поиск по имени или email..."
          value={filters.search || ""}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterGroup}>
        <select
          className={styles.filterSelect}
          value={filters.role || "all"}
          onChange={handleRoleChange}
        >
          <option value="all">Все роли</option>
          {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={
            filters.isActive === undefined
              ? "all"
              : filters.isActive
                ? "active"
                : "inactive"
          }
          onChange={handleStatusChange}
        >
          {USER_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button className={styles.clearButton} onClick={clearFilters}>
            <X size={16} />
            Сбросить
          </button>
        )}
      </div>
    </div>
  );
};
