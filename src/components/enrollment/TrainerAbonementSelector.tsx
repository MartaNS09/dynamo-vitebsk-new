"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import {
  getTrainerAbonementsBySection,
  TrainerAbonement,
} from "@/data/trainer-abonement-data";

interface TrainerAbonementSelectorProps {
  trainerName: string;
  sectionId: string;
  onSelect: (abonement: TrainerAbonement | null) => void;
  selectedAbonementId?: string;
}

export default function TrainerAbonementSelector({
  trainerName,
  sectionId,
  onSelect,
  selectedAbonementId,
}: TrainerAbonementSelectorProps) {
  const [abonements, setAbonements] = useState<TrainerAbonement[]>([]);
  const [selected, setSelected] = useState<TrainerAbonement | null>(null);

  useEffect(() => {
    if (!trainerName || !sectionId) {
      setAbonements([]);
      return;
    }

    const abonementsList = getTrainerAbonementsBySection(
      trainerName,
      sectionId,
    );
    setAbonements(abonementsList);
  }, [trainerName, sectionId]);

  if (!trainerName || !sectionId || abonements.length === 0) return null;

  return (
    <div className="form-group">
      <label htmlFor="trainer-abonement">
        <CreditCard size={16} />
        Выберите абонемент
      </label>
      <select
        id="trainer-abonement"
        value={selected?.id || selectedAbonementId || ""}
        onChange={(e) => {
          const abonement = abonements.find((a) => a.id === e.target.value);
          setSelected(abonement || null);
          onSelect(abonement || null);
        }}
      >
        <option value="">Выберите абонемент</option>
        {abonements.map((abonement) => (
          <option key={abonement.id} value={abonement.id}>
            {abonement.name} - {abonement.price} BYN
          </option>
        ))}
      </select>
    </div>
  );
}
