import { Router } from "express";
import { addToFavorite, getFavorites, removeFromFavorite } from "../Controllers/favoriteControllers";

const router = Router();

router.post("/addToFavorite", addToFavorite)
router.post("/fs/getFavorites", getFavorites)
router.delete("/removeFromFavorite", removeFromFavorite)

export { router as favoriteRoutes };