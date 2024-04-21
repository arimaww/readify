import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

export const getUserBasket = async (req: Request, res: Response) => {
    try{
        const basket = await prisma.basket.findMany();

        return res.status(200).json(basket);
    }
    catch(err) {
        console.log(err);
        res.status(500).json("Fatal Error " + err);
    }
}

export const addToUserBasket = async (req: Request, res: Response) => {
    try{
        const {userId, bookId} = req.body;

        if(!userId || !bookId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"})

        await prisma.basket.create({data: {
            bookId: parseInt(bookId),
            userId: parseInt(userId)
        }})

        return res.status(200).json({message: "Книга успешно добавлена в корзину"})
    }
    catch(err) {
        console.log(err);
        res.status(500).json("Fatal Error " + err);
    }
}

export const removeBookFromUserBasket = async (req: Request, res: Response) => {
    try{
        const {userId, bookId} = req.body;

        if(!userId || !bookId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"})

        await prisma.basket.deleteMany({where: {
            bookId: parseInt(bookId),
            userId: parseInt(userId)
        }})

        return res.status(200).json({message: "Книга успешно удалена с корзины"});
    }
    catch(err) {
        console.log(err);
        res.status(500).json("Fatal Error " + err);
    }
}