import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductsByCategory from "./pages/ProductsByCategory";
import ProductSection from './pages/Products';
import { CartProvider } from "./components/CartContext";
import PaymentPage from './pages/cartCheckour';
import ProductTable from './pages/Admin';
import CreateProduct from './pages/NewProduct';
import EditProduct from './pages/EditProduct';
import RegisterForm from './pages/Register';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Asegura que el contenido ocupe toda la altura de la pantalla */}
       <CartProvider> 
        <Navbar />
        {/* Mover CartProvider aquí para envolver todo el árbol de componentes */}
        
          <div className="flex-grow"> {/* Hace que este contenedor ocupe el espacio restante */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="categories/:categoryId" element={<ProductsByCategory />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products/:id" element={<ProductSection />} />
              <Route path="/cartCheckout" element={<PaymentPage/>} />
              <Route path= "/admin" element={<ProductTable/>} />
              <Route path= "/admin/create" element={<CreateProduct/>} />
              <Route path= "/admin/edit/:id" element={<EditProduct/>} />
              <Route path= "/register" element={<RegisterForm/>} />
            </Routes>
          </div>
        </CartProvider>
        <Footer /> {/* El footer estará fijado al fondo */}
      </div>
    </Router>
  );
};

export default App;
