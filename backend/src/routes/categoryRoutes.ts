import { Router } from "express";
import { getCategories, getCategoryById, createCategory, deleteCategory } from "../controllers/categoryController";

const router = Router();


router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById )
router.post("/categories", createCategory);
router.delete("/categories", deleteCategory);


export default router;
