"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Asegúrate de que la ruta sea correcta
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware para procesar los cuerpos de solicitudes en JSON
app.use(express_1.default.json());
// Configuración personalizada de CORS
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Asegúrate de que tu frontend esté corriendo en este puerto
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
};
// Aplica CORS con las opciones configuradas
app.use(cors(corsOptions));
// Usar las rutas de productos, categorías y carrito
app.use("/api", productRoutes_1.default); // Prefijo '/api' para todas las rutas de productos
app.use("/api", categoryRoutes_1.default);
app.use("/api", cartRoutes_1.default);
app.use("/api", userRoutes_1.default);
// Exportar la aplicación para usarla en el archivo server.ts
exports.default = app;
