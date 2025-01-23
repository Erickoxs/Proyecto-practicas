import React, { useEffect, useState } from "react";
import api from "../utils/api";
import useFetchProducts from "../hooks/useFetchProducts";

const ProductTable: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { products, loading, error } = useFetchProducts();
  const [productList, setProductList] = useState(products || []);

  useEffect(() => {
    const userRole = localStorage.getItem("role");

    if (userRole) {
      try {
        const roles = JSON.parse(userRole); // Convierte el string a un array
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

  // Sincronizar la lista de productos cuando la respuesta de useFetchProducts cambie
  useEffect(() => {
    if (products) {
      setProductList(products); // Actualiza el estado cuando products cambie
    }
  }, [products]);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await api.delete(`/api/products/${id}`);
        // Eliminar el producto de la lista local sin necesidad de recargar los productos
        setProductList(productList.filter(product => product._id !== id));
      } catch (err) {
        console.error("Error al eliminar producto:", err);
      }
    }
  };

  return !isAdmin ? (
    <div className="text-center text-red-500">No tienes permisos para acceder a esta página</div>
  ) : loading ? (
    <div className="text-center text-gray-500">Cargando productos...</div>
  ) : error ? (
    <div className="text-center text-red-500">Error: {error}</div>
  ) : !productList || productList.length === 0 ? (
    <div className="text-center text-gray-500">No hay productos disponibles.</div>
  ) : (
    <div className="p-4">
      <button className="flex items-center">
        Crear Producto
        <img src="/img/agregar.png" className="w-6 h-6 ml-2" alt="Agregar producto" />
      </button>
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Imagen</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Precio</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product._id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {product.imageURL ? (
                  <img src={product.imageURL} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                ) : (
                  <span>No disponible</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                ${product.price.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a href={`/admin/edit/${product._id}`}>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </a>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
