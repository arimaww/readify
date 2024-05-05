import { Router } from "express";
import { getAuthorBooks } from "../Controllers/authorControllers";

const router = Router();

router.post("/:userId", getAuthorBooks);

export { router as authorRoutes };