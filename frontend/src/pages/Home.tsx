import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import useFetchProducts from "../hooks/useFetchProducts";
import { useCart } from "../components/CartContext"; // Usar el contexto del carrito

const Home: React.FC = () => {
  const { products, loading } = useFetchProducts();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Obtener la función para añadir al carrito

  // Obtener los 3 primeros productos
  const featuredProducts = products?.slice(0, 3);

  // Función para manejar el click en el botón de categorías
  const handleNavigateToCategories = () => {
    navigate("/categories");
  };

  return (
    <div className="home-page">

      <main className="mt-8">
        {/* Carousel Section */}
        <section className="carousel-container mx-auto w-11/12 md:w-3/4">
          <h2 className="text-2xl font-semibold text-center mb-6">Destacados</h2>
          <Carousel />
        </section>

        {/* Products Section */}
        <section className="products-preview mt-12 px-4 md:px-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Nuevos Productos</h2>

          {loading ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {featuredProducts?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={() =>
                    addToCart({
                      ...product,
                      _id: product._id, // Asegurar que tiene `id`
                      quantity: 1, // Agregar cantidad por defecto
                    })
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Botón para redirigir a la página de categorías */}
        <section className="text-center mt-8">
          <button
            onClick={handleNavigateToCategories}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            Ver Todas las Categorías
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
