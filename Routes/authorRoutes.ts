import { Router } from "express";
import { getAuthorBooks, getAuthorById } from "../Controllers/authorControllers";

const router = Router();

router.post("/:userId", getAuthorBooks);
router.post("/d/getAuthorById", getAuthorById);

export { router as authorRoutes };