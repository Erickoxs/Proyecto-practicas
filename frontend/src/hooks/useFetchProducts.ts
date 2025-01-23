import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";




interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageURL?: string;
}

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await api.get("/api/products");
              console.log('Full Response:', response);  // Verifica toda la respuesta
              console.log('Response Data:', response.data);  // Verifica solo la data
              console.log('Products:', response.data?.products);  // Verifica los productos
              if (response.data && Array.isArray(response.data.products)) {
                setProducts(response.data.products);
              } else {
                setError("No products found in the response.");
              }
            } catch (error) {
              console.error('Error fetching products:', error);
              setError("Failed to fetch products.");
            } finally {
              setLoading(false);
            }
          };
          
  
      fetchProducts();
    }, []);
  
    return { products, loading, error };
  };
  
  export default useFetchProducts;