import React, { useState, useEffect } from "react";
import api from "../utils/api"
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const navigate = useNavigate();

  // Verificar si el usuario es admin
 useEffect(() => {
     const userRole = localStorage.getItem("role");
   
     if (userRole) {
       try {
         const roles = JSON.parse(userRole); // Convierte el string a un array
         // Verifica si el array contiene 'admin'
         if (Array.isArray(roles) && roles.includes("admin")) {
           setIsAdmin(true);
         } else {
           setIsAdmin(false);
         }
       } catch (error) {
         console.error("Error al parsear el rol:", error);
         setIsAdmin(false);
       }
     } else {
       setIsAdmin(false); // Si no hay rol en localStorage
     }
   }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProduct = {
      name,
      price,
      description,
      category,
      imageURL,
      stock,
    };

    try {
      const response = await api.post("/api/products", newProduct);
      console.log("Producto creado:", response.data);
      navigate("/admin"); // Redirige a la página de administración después de crear el producto
    } catch (err: any) {
      setError("Hubo un error al crear el producto. Intenta de nuevo.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si el usuario es admin
  if (isAdmin === null) {
    return <div className="text-center">Verificando permisos...</div>; // Mostrar mientras se verifica el rol
  }

  if (isAdmin === false) {
    return (
      <div className="text-center text-red-500">
        No tienes permisos para acceder a esta página.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Nombre del Producto</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Categoría</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">URL de la Imagen</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
