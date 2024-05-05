import { Router } from "express";
import { getAllCategories } from "../Controllers/categoriesControllers";

const router = Router();

router.get("/", getAllCategories)

export { router as categoriesRoutes };