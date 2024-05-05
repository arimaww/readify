import { Request, Response, Router } from "express";
import { changeRole, userCurrent, userLogin, userRegister, updateUser, deleteUser, getAllUsers } from "../Controllers/userControllers";
import { auth } from "../Middleware/auth";
import multer from "multer";
import path from "path";


const router = Router();

const storage = multer.diskStorage({
    destination: './assets/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/current', auth, userCurrent);
router.post('/update', upload.single("profilePhoto"), updateUser);
router.post('/changeRole', changeRole)
router.delete('/delete', deleteUser)
router.get('/allUsers', getAllUsers)

export { router as userRoutes };