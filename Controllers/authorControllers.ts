import { Book, Prisma, User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

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