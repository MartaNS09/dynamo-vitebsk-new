"use client";

import { useState, useEffect } from "react";
import { ApplicationsTable } from "@/components/admin/applications/ApplicationsTable";
import { mockApplications, getApplicationStats } from "@/data/applications";
import { Application, ApplicationStatus } from "@/types/application.types";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  }, []);

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              updatedAt: new Date().toISOString(),
              statusHistory: [
                ...app.statusHistory,
                {
                  status,
                  changedAt: new Date().toISOString(),
                  changedBy: "current_user",
                  changedByName: "Текущий пользователь",
                },
              ],
            }
          : app,
      ),
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить заявку?")) {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    }
  };

  if (loading) {
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
