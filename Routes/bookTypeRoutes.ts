import { Router } from "express";
import { getAllTypes } from "../Controllers/bookTypeControllers";

const router = Router();

router.get("types/", getAllTypes)


export { router as bookTypeRoutes };