import { Router } from "express";
import { getAllCommentsForBook, getAllRatings, getBookRatingsById, leaveComment, removeComment, removeRating, setRating } from "../Controllers/bookInfoControllers";

const router = Router();

router.post('/getratings', getBookRatingsById);
router.get('/getAllRatings', getAllRatings);
router.post('/setrating', setRating);
router.delete('/removeRating', removeRating);
router.post('/leaveComment', leaveComment)
router.delete('/removeComment', removeComment)
router.post('/getAllCommentsForBook', getAllCommentsForBook)

export default router;