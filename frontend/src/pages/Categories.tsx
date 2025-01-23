import React from "react";
import useFetchCategories from "../hooks/useFetchCategory"; // Asegúrate de que esta sea la ruta correcta

const Categories: React.FC = () => {
  const { categories, loading, error } = useFetchCategories();

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="category-list-page">
      <h1 className="text-3xl font-bold text-center mb-6">Todas las Categorías</h1>

      {/* Contenedor de las categorías centrado usando flexbox */}
      <div className="mt-8 categories-container flex flex-wrap justify-center gap-8 px-4">
        {categories?.map((category) => (
          <div key={category._id} className="category-card p-4 border rounded-lg shadow-lg bg-white max-w-xs w-full flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-center">{category.name}</h2>
            {category.description && <p className="text-center mt-2 text-gray-600">{category.description}</p>}
            
            {/* Aseguramos que el enlace se quede separado y centrado */}
            <div className="mt-6 w-full flex justify-center">  {/* Aumentamos el margin-top */}
              <a
                href={`/categories/${category._id}`}  // Enlace a la página de la categoría
                className="text-blue-600 hover:text-blue-800"
              >
                Ver Productos
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
