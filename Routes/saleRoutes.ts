import { Router } from "express";
import { createSale, getSales, terminateSale } from "../Controllers/saleControllers";

const router = Router();

router.get('/', getSales);
router.post('/', createSale);
router.delete('/', terminateSale);

export default router;