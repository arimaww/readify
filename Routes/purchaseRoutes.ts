import { Router } from "express";
import { createPurchase, getAllPurchasesByUserId } from "../Controllers/purchaseControllers";

const router = Router();

router.post('/getAllPurchasesByUserId', getAllPurchasesByUserId)
router.post('/createPurchase', createPurchase)

export { router as purchaseRoutes };