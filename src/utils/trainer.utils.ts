import { ALL_SECTIONS } from "@/data/sport-sections";
import { ALL_DEPARTMENTS } from "@/data/departments";

export interface Trainer {
  id: string;
  name: string;
  position: string;
  photo?: string;
  department: string;
  departments: Array<{
    id: string;
    slug: string;
    name: string;
    title: string;
  }>;
  sections: Array<{
    id: string;
    slug: string;
    name: string;
    category?: string;
  }>;
}

/**
 * Получает всех тренеров из всех секций и отделений
 */
export function getAllTrainers(): Trainer[] {
  // Собираем тренеров из спортивных секций
  const sectionTrainers = ALL_SECTIONS.flatMap((section) =>
    section.trainers.map((trainer) => ({
      trainer: {
        id: trainer.id,
        name: trainer.name,
        position: trainer.position,
        photo: trainer.photo,
      },
      source: {
        type: "sport" as const,
        id: section.id,
        slug: section.slug,
        name: section.name,
        category: section.category,
      },
    }))
  );

  // Собираем тренеров из отделений
  const departmentTrainers = ALL_DEPARTMENTS.flatMap((department) =>
    department.coaches.map((coach) => ({
      trainer: {
        id: coach.id,
        name: coach.name,
        position: coach.position,
        photo: coach.photo,
      },
      source: {
        type: "department" as const,
        id: department.id,
        slug: department.internalSlug,
        name: department.title,
      },
    }))
  );

  // Объединяем всех тренеров
  const allTrainersData = [...sectionTrainers, ...departmentTrainers];

  // Группируем по ID (если тренер ведет и в отделении и в секции)
  const trainersMap = new Map<string, Trainer>();

  allTrainersData.forEach(({ trainer, source }) => {
    if (!trainersMap.has(trainer.id)) {
      trainersMap.set(trainer.id, {
        id: trainer.id,
        name: trainer.name,
        position: trainer.position,
        photo: trainer.photo,
        department: source.type === "department" ? source.name : "",
        departments: [],
        sections: [],
      });
    }

    const existingTrainer = trainersMap.get(trainer.id)!;

    if (source.type === "department") {
      if (!existingTrainer.departments.some((d) => d.id === source.id)) {
        existingTrainer.departments.push({
          id: source.id,
          slug: source.slug,
          name: source.name,
          title: source.name,
        });
      }
      existingTrainer.department = source.name;
    } else {
      if (!existingTrainer.sections.some((s) => s.id === source.id)) {
        existingTrainer.sections.push({
          id: source.id,
          slug: source.slug,
          name: source.name,
          category: source.category,
        });
      }
    }
  });

  // Преобразуем Map в массив и сортируем по фамилии
  return Array.from(trainersMap.values()).sort((a, b) => {
    const lastNameA = a.name.split(" ")[0];
    const lastNameB = b.name.split(" ")[0];
    return lastNameA.localeCompare(lastNameB, "ru");
  });
}

/**
 * Получает уникальные отделения для фильтрации
 */
export function getDepartments(): Array<{
  id: string;
  name: string;
  slug: string;
  count: number;
}> {
  const trainers = getAllTrainers();
  const departmentsMap = new Map<
    string,
    { id: string; name: string; slug: string; count: number }
  >();

  // Добавляем "Все отделения"
  departmentsMap.set("all", {
    id: "all",
    name: "Все тренеры",
    slug: "all",
    count: trainers.length,
  });

  // Собираем все отделения из тренеров
  trainers.forEach((trainer) => {
    trainer.departments.forEach((dept) => {
      const existing = departmentsMap.get(dept.slug);
      if (existing) {
        existing.count += 1;
      } else {
        departmentsMap.set(dept.slug, {
          id: dept.id,
          name: dept.name,
          slug: dept.slug,
          count: 1,
        });
      }
    });
  });

  // Если у тренера нет отделений, но есть department поле
  trainers.forEach((trainer) => {
    if (trainer.department && !trainer.departments.length) {
      const slug = trainer.department.toLowerCase().replace(/\s+/g, "-");
      const existing = departmentsMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        departmentsMap.set(slug, {
          id: slug,
          name: trainer.department,
          slug: slug,
          count: 1,
        });
      }
    }
  });

  return Array.from(departmentsMap.values()).sort((a, b) => {
    if (a.id === "all") return -1;
    if (b.id === "all") return 1;
    return a.name.localeCompare(b.name, "ru");
  });
}

/**
 * Фильтрует тренеров по отделению
 */
export function filterTrainersByDepartment(
  trainers: Trainer[],
  departmentSlug: string
): Trainer[] {
  if (departmentSlug === "all") return trainers;

  return trainers.filter(
    (trainer) =>
      trainer.departments.some((dept) => dept.slug === departmentSlug) ||
      (trainer.department &&
        trainer.department.toLowerCase().replace(/\s+/g, "-") ===
          departmentSlug)
  );
}
