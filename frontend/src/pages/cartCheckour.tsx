import React, { useState } from "react";
import { useCart } from "../components/CartContext";

const PaymentPage: React.FC = () => {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Procesando pago con los datos:", formData);
    alert("Pago realizado con éxito!");
    // Aquí puedes implementar la lógica para procesar el pago con un backend o una API de pagos.
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Página de Pago</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información de Pago */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Información de Pago</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dirección</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Número de Tarjeta</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                required
                maxLength={16}
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de Expiración</label>
                <input
                  type="text"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                  placeholder="MM/AA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                  maxLength={3}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
            >
              Confirmar Pago
            </button>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Resumen del Pedido</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-xl font-bold">
              Total: <span>${calculateTotal()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
