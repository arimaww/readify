import { Request, Response } from "express"
import { prisma } from "../prisma/prisma-client";

export const getAllPurchasesByUserId = async (req: Request, res: Response) => {
    try{
        const {userId} = req.body;

        const purchases = await prisma.purchase.findMany({where: {userId: parseInt(userId)}});

        return res.status(200).json(purchases)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}

export const createPurchase = async (req: Request, res: Response) => {
    try{
        const {userId, bookId} = req.body;

        let purchase = await prisma.purchase.findFirst({where: {bookId: parseInt(bookId), userId: parseInt(userId)}})

        if(purchase)
            return res.status(400).json({message: "Вы уже покупали эту книгу"});

        purchase = await prisma.purchase.create({data: {
            bookId: parseInt(bookId),
            userId: parseInt(userId)
        }})

        return res.status(200).json(purchase)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err})
    }
}