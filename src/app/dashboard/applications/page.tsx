"use client";

import { useState, useEffect, useCallback } from "react";
import { ApplicationsTable } from "@/components/admin/applications/ApplicationsTable";
import {
  getApplications,
  getApplicationStats,
  updateApplication,
  deleteApplication,
} from "@/lib/api/applications";
import { Application } from "@/types/application.types";

// Определяем тип для статистики
interface ApplicationStats {
  total: number;
  new: number;
  inProgress: number;
  contacted: number;
  completed: number;
  cancelled: number;
  conversionRate: number;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 50,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      console.log("📥 Загружаем заявки...");
      const [appsData, statsData] = await Promise.all([
        getApplications(filters),
        getApplicationStats(),
      ]);

      console.log("📦 Данные заявок:", appsData);

      // Проверяем структуру данных
      if (appsData && appsData.items) {
        setApplications(appsData.items);
      } else if (Array.isArray(appsData)) {
        setApplications(appsData);
      } else {
        console.error("Неожиданный формат данных:", appsData);
        setApplications([]);
      }

      setStats(statsData);
    } catch (error) {
      console.error("❌ Ошибка загрузки:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      // Маппинг статусов для правильного ID
      const statusMap: Record<string, string> = {
        new: "cmmvw8foo0000pxcafe77n38k",
        in_progress: "cmmvw8fp50001pxcagnwe94re",
        contacted: "cmmvw8fpf0002pxcazmkczu3d",
        completed: "cmmvw8fpk0003pxcav65ar7cy",
        cancelled: "cmmvw8fpn0004pxca1i2ubgmv",
      };

      // ИСПРАВЛЕНО: добавляем as keyof typeof statusMap
      const statusId = statusMap[status as keyof typeof statusMap];
      if (!statusId) {
        console.error("Не найден ID статуса для:", status);
        return;
      }

      await updateApplication(id, { statusId: statusId });
      await loadData();
    } catch (error) {
      console.error("Ошибка обновления статуса:", error);
      alert("Не удалось обновить статус");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить заявку?")) {
      try {
        await deleteApplication(id);
        await loadData();
      } catch (error) {
        console.error("Ошибка удаления:", error);
        alert("Не удалось удалить заявку");
      }
    }
  };

  if (loading && applications.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <ApplicationsTable
      applications={applications}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  );
}
