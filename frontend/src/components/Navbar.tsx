import React, { useState, useEffect } from "react";
import CartModal from "../components/CartModal";
import LoginModal from "./LoginModal";
import { useCart } from "../components/CartContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const [userName, setUserName] = useState<string | null>(null);

  // Maneja la apertura y cierre del modal
  const handleLoginOpen = () => setIsLoginModalOpen(true);
  const handleLoginClose = () => setIsLoginModalOpen(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Comprueba si hay un token en el almacenamiento local al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tienda
          </span>
        </a>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
  {userName ? (
    <div className="flex items-center space-x-2">
      <span className="text-gray-900 md:p-0 dark:text-white">
        Hola, {userName}
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center justify-center p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        title="Cerrar sesión"
      >
        <img
          src="/img/salida.png"
          alt="Cerrar sesión"
          className="w-6 h-6"
        />
      </button>
    </div>
  ) : (
    <button
      onClick={handleLoginOpen}
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    >
      <img
        src="/img/usuario.svg"
        alt="Usuario"
        className="w-6 h-6"
      />
    </button>
  )}
</li>
            <li>
              <button
                onClick={() => setCartOpen(true)}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <img
                  src="/img/carrito-de-compras.svg"
                  alt="Carrito"
                  className="w-6 h-6"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Modal del carrito */}
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal
          onClose={handleLoginClose}
          onLogin={(userName) => setUserName(userName)}
        />
      )}
    </nav>
  );
};

export default Navbar;
