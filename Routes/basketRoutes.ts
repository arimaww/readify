import { Router } from "express";
import { addToUserBasket, removeBookFromUserBasket, getUserBasket } from "../Controllers/basketControllers";

const router = Router();

router.get("/", getUserBasket);
router.post("/", addToUserBasket);
router.delete("/", removeBookFromUserBasket);


export { router as basketRoutes }