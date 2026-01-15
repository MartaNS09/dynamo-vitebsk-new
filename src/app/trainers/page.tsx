import { Metadata } from "next";
import { getAllTrainers, getDepartments } from "@/utils/trainer.utils";
import TrainersPageClient from "./TrainersPageClient";

export const metadata: Metadata = {
  title: "Тренеры-преподаватели - Витебская СДЮШОР Динамо",
  description:
    "Профессиональные тренеры-преподаватели Витебской СДЮШОР Динамо по кикбоксингу, велоспорту, художественной гимнастике, дзюдо, каратэ, легкой атлетике и другим видам спорта.",
  keywords:
    "тренеры Витебск, тренеры-преподаватели, СДЮШОР Динамо, спортивные тренеры, кикбоксинг, велоспорт, художественная гимнастика, дзюдо, каратэ",
  openGraph: {
    title: "Тренеры-преподаватели - Витебская СДЮШОР Динамо",
    description:
      "Профессиональные тренеры-преподаватели Витебской СДЮШОР Динамо",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrainersPage() {
  const trainers = getAllTrainers();
  const departments = getDepartments();

  return <TrainersPageClient trainers={trainers} departments={departments} />;
}
