import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard"; // Asegúrate de que esta ruta sea correcta
import api from "../utils/api"; // Ruta correcta para el cliente API
import { useCart } from "../components/CartContext"; // Importar el contexto del carrito

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams(); // Aseguramos el tipo de parámetro
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]); // Estado para los productos
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado para indicar si estamos cargando datos

  const { addToCart } = useCart(); // Obtener la función para añadir productos al carrito

  // Función para obtener la categoría
  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) {
        setError("ID de categoría no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/api/categories/${categoryId}`); // Petición para obtener la categoría
        console.log("Categoría obtenida:", response.data);
        setCategory(response.data.category);
      } catch (err) {
        console.error("Error al obtener la categoría:", err);
        setError("No se pudo cargar la categoría.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // Función para obtener los productos por categoría
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId) {
        setError("ID de categoría no proporcionado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/api/products/category/${categoryId}`); // Petición para obtener los productos
        console.log("Productos obtenidos:", response.data.products);
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error al obtener los productos:", err);
        setError("No se pudieron cargar los productos.");
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) {
    return <p className="text-center mt-8">Cargando categoría...</p>; // Mensaje de carga centrado
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>; // Mensaje de error centrado
  }

  return (
    <div className="category-page text-center mt-12 space-y-6">
      <h1 className="text-3xl font-bold">{category?.name}</h1>
      {category?.description && <p className="text-lg">{category.description}</p>}

      {/* Contenedor de productos centrado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 justify-items-center">
        {products.length > 0 ? (
          products.map((product: any) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() =>
                addToCart({
                  ...product,
                  quantity: 1, // Aseguramos que la cantidad inicial sea 1
                })
              }
            />
          ))
        ) : (
          <p>No se encontraron productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
