import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const addToFavorite = async (req: Request, res: Response) => {
    try {
        const { bookId, userId } = req.body;
        if (!bookId || !userId)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        const book = await prisma.book.findFirst({ where: { bookId: parseInt(bookId) } });
        if (!book)
            return res.status(404).json({ message: "Книга с указанным id не найдена" });

        const favorite = await prisma.favorite.create({
            data: {
                userId: parseInt(userId),
                bookId: parseInt(bookId)
            }
        })

        return res.status(200).json(favorite);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const getFavorites = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        const favorites = await prisma.favorite.findMany({ where: { userId: parseInt(userId) } });

        return res.status(200).json(favorites);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}

export const removeFromFavorite = async (req: Request, res: Response) => {
    try {
        const { bookId, userId } = req.body;
        if (!bookId || !userId)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        await prisma.favorite.deleteMany({
            where: {
                bookId: parseInt(bookId),
                userId: parseInt(userId)
            }
        });

        return res.status(200).json({ message: "Книга успешно удалена с избранного" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err });
    }
}