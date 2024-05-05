import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "../Controllers/bookControllers";
import multer from "multer";
import path from "path";

const router = Router();

const uploadFileAndPicture = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/books/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});


const uploadImage = multer({ storage: uploadFileAndPicture })
const upload = multer({ storage: uploadFileAndPicture });
const uploadMultiple = upload.array('file1', 2);

router.post("/create/book", uploadMultiple, createBook)
router.put("/update/", uploadMultiple, updateBook)
router.delete("/deleteBook", deleteBook)
router.post("/getBooks/:bookId", getBookById)
router.get("/b/getAllBooks", getAllBooks)

export { router as bookRoutes };