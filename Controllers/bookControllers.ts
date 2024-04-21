import { Request, Response } from "express"
import { prisma } from "../prisma/prisma-client";
import { Book, Prisma, User } from "@prisma/client";

export const getAuthorBooks = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;


        const user: (User | null) = await prisma.user.findFirst<Prisma.UserFindFirstArgs>({ where: { userId: parseInt(userId) } });

        if (!user)
            return res.status(404).json({ message: "Такого пользователя не существует" });

        if (user.role !== 'AUTHOR')
            return res.status(400).json({ message: "Данный пользователь не является автором" });

        const book: (Book[] | null) = await prisma.book.findMany<Prisma.BookFindFirstArgs>({ where: { authorId: user?.userId } })

        return res.status(200).json(book)

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}
interface CustomRequest extends Request {
    files: Express.Multer.File[]
}
export const createAuthorBook = async (req: Request, res: Response) => {
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

export const updateAuthorBook = async (req: Request, res: Response) => {
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
            // Получаем первый файл из запроса
            const uploadedFile = (req as CustomRequest).files[0];
        
            // Проверяем MIME-тип файла
            if (uploadedFile.mimetype.includes("image")) {
                // Если MIME-тип указывает на изображение, записываем его в переменную picture
                picture = uploadedFile;
            } else {
                // Если MIME-тип не указывает на изображение, записываем файл в переменную fileFromFront
                fileFromFront = uploadedFile;
            }
        
            // Если загружается два файла, обрабатываем второй файл
            if ((req as CustomRequest).files.length > 1) {
                const secondFile = (req as CustomRequest).files[1];
                // Проверяем MIME-тип второго файла
                if (secondFile.mimetype.includes("image")) {
                    // Если MIME-тип указывает на изображение, перезаписываем переменную picture
                    picture = secondFile;
                } else {
                    // Если MIME-тип не указывает на изображение, перезаписываем переменную fileFromFront
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

export const deleteAuthorBook = async (req: Request, res: Response) => {
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

export const getAllTypes = async (req: Request, res: Response) => {
    try {
        const types = await prisma.bookType.findMany();

        return res.status(200).json(types);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await prisma.categories.findMany();

        return res.status(200).json(categories);
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

export const getAuthorById = async (req: Request, res: Response) => {
    try{
        const {authorId} = req.body;
        
        if(!authorId)
            return res.status(400).json({message: "Поле authorId не заполнено"});

        const user = await prisma.user.findFirst<Prisma.UserFindFirstArgs>({where: {userId: authorId, role: "AUTHOR"}});

        if(!user)
            return res.status(404).json({message: "Такого автора не существует"});
        

        return res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err)
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

export const addToFavorite = async (req: Request, res: Response) => {
    try {
        const {bookId, userId} = req.body;
        if(!bookId || !userId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"});

        const book = await prisma.book.findFirst({where: {bookId: parseInt(bookId)}});
        if(!book)
            return res.status(404).json({message: "Книга с указанным id не найдена"});

        const favorite = await prisma.favorite.create({data: {
            userId: parseInt(userId),
            bookId: parseInt(bookId)
        }})

        return res.status(200).json(favorite);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({message: "Fatal Error " + err});
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    try{
        const {userId} = req.body;

        if(!userId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"});

        const favorites = await prisma.favorite.findMany({where: {userId: parseInt(userId)}});

        return res.status(200).json(favorites);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal Error " + err});
    }
}

export const removeFromFavorite = async (req: Request, res: Response) => {
    try{
        const {bookId, userId} = req.body;
        if(!bookId || !userId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"});

        await prisma.favorite.deleteMany({where: {
            bookId: parseInt(bookId),
            userId: parseInt(userId)
        }});

        return res.status(200).json({message: "Книга успешно удалена с избранного"});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal Error " + err});
    }
}