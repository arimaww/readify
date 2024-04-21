import { Router } from "express";
import { getBookRatingsById, removeRating, setRating } from "../Controllers/bookInfoControllers";

const router = Router();

router.post('/getratings', getBookRatingsById);
router.post('/setrating', setRating);
router.delete('/removeRating', removeRating);

export default router;