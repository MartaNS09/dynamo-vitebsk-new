import { useState, useEffect } from "react";
import { SportSection } from "@/types/sport-section.types";
import {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} from "@/lib/api/sections";

export function useSections() {
  const [sections, setSections] = useState<SportSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSections = async () => {
    setLoading(true);
    try {
      const data = await getSections();
      setSections(data);
      setError(null);
    } catch (err) {
      setError("Ошибка загрузки секций");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSection = async (id: string) => {
    setLoading(true);
    try {
      const data = await getSectionById(id);
      setError(null);
      return data;
    } catch (err) {
      setError("Ошибка загрузки секции");
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (
    id: string | null,
    data: Partial<SportSection>,
  ) => {
    setLoading(true);
    try {
      if (id && id !== "new") {
        await updateSection(id, data);
      } else {
        await createSection(data);
      }
      await loadSections();
      setError(null);
      return true;
    } catch (err) {
      setError("Ошибка сохранения секции");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeSection = async (id: string) => {
    setLoading(true);
    try {
      await deleteSection(id);
      await loadSections();
      setError(null);
      return true;
    } catch (err) {
      setError("Ошибка удаления секции");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSections();
  }, []);

  return {
    sections,
    loading,
    error,
    loadSections,
    loadSection,
    saveSection,
    removeSection,
  };
}
