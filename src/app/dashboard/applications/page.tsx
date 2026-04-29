"use client";

import { useState, useEffect } from "react";
import { ApplicationsTable } from "@/components/admin/applications/ApplicationsTable";
import { Application, ApplicationStatus } from "@/types/application.types";
import {
  deleteApplication,
  getApplications,
  updateApplicationStatus,
} from "@/lib/api/applications";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    const updated = await updateApplicationStatus(id, status);
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? updated : app)),
    );
  };

  const handleDelete = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить заявку?")) {
      await deleteApplication(id);
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
