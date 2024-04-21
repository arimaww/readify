import { Router } from "express";
import { createAuthorBook, 
    deleteAuthorBook, 
    getAllCategories, 
    getAllTypes, 
    getAuthorBooks, 
    updateAuthorBook, 
    getBookById,
    getAuthorById,
    getAllBooks,
    addToFavorite,
    getFavorites,
    removeFromFavorite } from "../Controllers/bookControllers";
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


const uploadImage = multer({storage: uploadFileAndPicture})
const upload = multer({ storage: uploadFileAndPicture });
const uploadMultiple = upload.array('file1', 2);

router.post("/:userId", getAuthorBooks); // получает все книги автора
// router.post("/create/book", uploadImage.array('multi-files'), createAuthorBook) // создает книгу от автора
router.post("/create/book", uploadMultiple, createAuthorBook) // создает книгу от автора
router.put("/update/", uploadMultiple, updateAuthorBook) // обновляет (данные) книги от автора
router.delete("/deleteBook", deleteAuthorBook) // удаляет книгу от автора
router.get("/types/", getAllTypes) // получение всех типов книг
router.get("/categories/", getAllCategories) // получение всех типов книг
router.post("/getBooks/:bookId", getBookById) // получение всех типов книг
router.post("/author/getAuthorById", getAuthorById) // получение автора книги по id
router.get("/b/getAllBooks", getAllBooks) // получение списка всех существующих книг
router.post("/favorite/addToFavorite", addToFavorite) // добавление книги в избранное
router.post("/favorite/fs/getFavorites", getFavorites) // получение списка избранных книг определённого пользователя
router.delete("/favorite/removeFromFavorite", removeFromFavorite) // удаление из списка избранных

export default router;