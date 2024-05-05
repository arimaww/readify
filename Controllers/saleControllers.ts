import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";


export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await prisma.sale.findMany();
        return res.status(200).json(sales);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error: " + err })
    }
}

export const createSale = async (req: Request, res: Response) => {
    try {
        const { authorId, bookId } = req.body;
        if (!authorId || !bookId)
            return res.status(400).json({ message: "Не удалось совершить продажу" });

        const sale = await prisma.sale.create({
            data: {
                authorId: parseInt(authorId),
                bookId: parseInt(bookId)
            }
        })

        return res.status(200).json(sale);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error: " + err });
    }
}

export const terminateSale = async (req: Request, res: Response) => {
    try {
        const {saleId} = req.body;

        if(!saleId)
            return res.status(200).json({message: "Не удалось расторгнуть продажу"})
        
        const sale = await prisma.sale.delete({where: {saleId: saleId}});

        return res.status(200).json({message: "Продажа успешно отменена"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error: " + err });
    }
}