import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

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