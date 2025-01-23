import { useState, useEffect } from "react";
import api from "../utils/api";  // Asegúrate de que esta sea la ruta correcta

interface Category {
  _id: string;
  name: string;
  description?: string;
}

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories");  // Cambiado para obtener todas las categorías
        console.log("Categories Response:", response.data);
        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);  // Guardamos las categorías obtenidas
        } else {
          setError("No categories found.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);  // Este efecto solo se ejecutará una vez al montar el componente

  return { categories, loading, error };
};

export default useFetchCategories;
