"use client";

import { useState, useEffect } from "react";
import { getTrainerAbonementByPriceAndSection } from "@/data/trainer-abonement-data";

interface TrainerSelectorProps {
  sectionId: string;
  abonementPrice?: number;
  onSelect: (trainer: any, paymentAccount: string) => void;
  selectedTrainerId?: string;
}

export default function TrainerSelector({
  sectionId,
  abonementPrice,
  onSelect,
  selectedTrainerId,
}: TrainerSelectorProps) {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>(selectedTrainerId || "");

  useEffect(() => {
    fetch(`http://localhost:3001/sections/${sectionId}`)
      .then((res) => res.json())
      .then((data) => {
        let filteredTrainers = data.trainers || [];

        if (abonementPrice) {
          filteredTrainers = filteredTrainers.filter((trainer: any) => {
            const abonementData = getTrainerAbonementByPriceAndSection(
              trainer.name,
              abonementPrice,
              sectionId,
            );
            return abonementData !== null;
          });
        }

        setTrainers(filteredTrainers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки тренеров:", error);
        setLoading(false);
      });
  }, [sectionId, abonementPrice]);

  const handleSelect = (trainer: any) => {
    setSelectedId(trainer.id);
    let paymentAccount = "";
    if (abonementPrice) {
      const abonementData = getTrainerAbonementByPriceAndSection(
        trainer.name,
        abonementPrice,
        sectionId,
      );
      paymentAccount = abonementData?.paymentAccount || "";
    }
    onSelect(trainer, paymentAccount);
  };

  if (loading) {
    return <div>Загрузка тренеров...</div>;
  }

  if (trainers.length === 0) {
    return <div>Нет доступных тренеров для выбранного абонемента</div>;
  }

  return (
    <div className="form-group">
      <label>Выберите тренера:</label>
      <select
        value={selectedId}
        onChange={(e) => {
          const trainer = trainers.find((t) => t.id === e.target.value);
          if (trainer) handleSelect(trainer);
        }}
      >
        <option value="">Выберите тренера</option>
        {trainers.map((trainer) => (
          <option key={trainer.id} value={trainer.id}>
            {trainer.name} - {trainer.position}
          </option>
        ))}
      </select>
    </div>
  );
}
