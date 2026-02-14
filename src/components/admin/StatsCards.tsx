"use client";

import React from "react";
import { DashboardStats } from "@/types/auth.types";
import { Dumbbell, FileText, Users, Calendar } from "lucide-react";

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: "Спортивные секции",
      value: stats.totalSections || 11,
      icon: Dumbbell,
      color: "var(--dynamo-blue)",
    },
    {
      title: "Активные секции",
      value: stats.activeSections || 11,
      icon: Users,
      color: "var(--accent-teal)",
    },
    {
      title: "Статьи в блоге",
      value: stats.totalBlogPosts || 3,
      icon: FileText,
      color: "var(--accent-purple)",
    },
    {
      title: "Ближайшие события",
      value: "3",
      icon: Calendar,
      color: "var(--accent-cyan)",
    },
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className="stat-card"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="card-header">
            <h3>{card.title}</h3>
            <div className="card-icon" style={{ color: card.color }}>
              <card.icon size={18} />
            </div>
          </div>
          <div className="card-value">{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
