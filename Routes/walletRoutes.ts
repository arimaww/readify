import { Router } from "express";
import { setWalletValue } from "../Controllers/walletControllers";

const router = Router();


router.post('/setWalletValue', setWalletValue)

export default router;