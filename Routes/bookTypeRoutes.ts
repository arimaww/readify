import { Router } from "express";
import { getAllTypes } from "../Controllers/bookTypeControllers";

const router = Router();

router.get("/", getAllTypes)


export { router as bookTypeRoutes };