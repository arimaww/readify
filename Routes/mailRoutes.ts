import { Router } from "express";
import { sendCodeToUserMail } from "../Controllers/mailControllers";

const router = Router();

router.post('/', sendCodeToUserMail)

export {router as mailRoutes};