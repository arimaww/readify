import { Request, Response } from "express"
import { prisma } from "../prisma/prisma-client";
import { Book, Prisma, User } from "@prisma/client";

interface CustomRequest extends Request {
    files: Express.Multer.File[]
}

export const createBook = async (req: Request, res: Response) => {
    try {
        const { bookName, about, description, language, typeId, authorId, categoryId, cost } = req.body;

        if (!bookName || !about || !description || !language || !cost || !typeId || !authorId || !categoryId)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        let book: (Book | null) = await prisma.book.findFirst({ where: { bookName: bookName } });

        if (book?.bookName === bookName)
            return res.status(400).json({ message: "Книга с таким названием уже существует" });

        const array = (req as CustomRequest)?.files;
        console.log(array)

        book = await prisma.book.create<Prisma.BookCreateArgs>({
            data: {
                bookName: bookName,
                about: about,
                description: description,
                categoryId: parseInt(categoryId),
                typeId: parseInt(typeId),
                authorId: parseInt(authorId),
                language: language,
                file: `http://localhost:${process.env.PORT}/static/books/${(req as CustomRequest).files[0]?.filename}`,
                picture: `http://localhost:${process.env.PORT}/static/books/${(req as CustomRequest).files[1]?.filename}`,
                cost: parseInt(cost)
            }
        })

        return res.status(200).json(book);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.body;
        const { bookName, about, description, language, typeId, categoryId, cost } = req.body;

        console.log(req.files)

        if (!bookId)
            return res.status(400).json({ message: "Книга не найдена" });

        if (!bookName || !about || !description || !typeId || !categoryId || !cost)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        const prevBook = await prisma.book.findFirst({ where: { bookId: parseInt(bookId) } })
        let fileFromFront: Express.Multer.File | null = null;
        let picture: Express.Multer.File | null = null;
        if ((req as CustomRequest).files && (req as CustomRequest).files.length > 0) {
            const uploadedFile = (req as CustomRequest).files[0];

            if (uploadedFile.mimetype.includes("image")) {
                picture = uploadedFile;
            } else {
                fileFromFront = uploadedFile;
            }
        
            if ((req as CustomRequest).files.length > 1) {
                const secondFile = (req as CustomRequest).files[1];
                if (secondFile.mimetype.includes("image")) {
                    picture = secondFile;
                } else {
                    fileFromFront = secondFile;
                }
            }
        }
        const book = await prisma.book.update({
            where: { bookId: parseInt(bookId) }, data: {
                bookName: bookName,
                about: about,
                categoryId: parseInt(categoryId),
                description: description,
                language: language,
                typeId: parseInt(typeId),
                file: fileFromFront ? `http://localhost:${process.env.PORT}/static/books/${fileFromFront.filename}` : prevBook?.file,
                picture: picture ? `http://localhost:${process.env.PORT}/static/books/${picture.filename}` : prevBook?.picture,
                cost: parseInt(cost)
            }
        })

        return res.status(200).json(book);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.body;

        if (!bookId)
            return res.status(404).json({ message: "Книга не найдена" });

        const book = await prisma.book.findFirst({ where: { bookId: parseInt(bookId) } });
        if (!book)
            return res.status(404).json({ message: "Книга не найдена" });

        await prisma.book.delete({ where: { bookId: parseInt(bookId) } })

        return res.status(200).json({ message: "Книга успешно удалена" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;

        const book = await prisma.book.findFirst({ where: { bookId: parseInt(bookId) } });
        if (!book)
            return res.status(404).json({ message: "Книга не найдена" });
        return res.status(200).json(book)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const getAllBooks = async (req: Request, res: Response) => {
    try{
        const books = await prisma.book.findMany();

        if(!books)
            return res.status(404).json({message: "Список книг пуст"});
        
        return res.status(200).json(books);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal Error " + err});
    }
}