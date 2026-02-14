"use client";

import React from "react";
import { ActivityLog } from "@/types/auth.types";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import "@/styles/admin/dashboard.scss";

interface ActivityFeedProps {
  activities: ActivityLog[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActionClass = (action: string) => {
    switch (action) {
      case "создал":
        return "create";
      case "обновил":
        return "update";
      case "добавил":
        return "create";
      case "удалил":
        return "delete";
      default:
        return "update";
    }
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case "section":
        return "🏋️";
      case "blog":
        return "📝";
      case "user":
        return "👤";
      default:
        return "📌";
    }
  };

  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h2>Последняя активность</h2>
        <p>Последние действия в системе управления</p>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="activity-item animate-slide-in"
            data-delay={index * 100}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="activity-avatar">
              {activity.user.avatar ? (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--gradient-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  {activity.user.name.charAt(0)}
                </div>
              ) : (
                <span>{activity.user.name.charAt(0)}</span>
              )}
            </div>

            <div className="activity-content">
              <div className="activity-text">
                <strong>{activity.user.name}</strong> {activity.action}{" "}
                <span className="entity-name">{activity.entityName}</span>
              </div>
              <div className="activity-time">
                {formatDistanceToNow(new Date(activity.timestamp), {
                  addSuffix: true,
                  locale: ru,
                })}
              </div>
            </div>

            <div
              className={`activity-action ${getActionClass(activity.action)}`}
            >
              {getEntityIcon(activity.entity)} {activity.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
