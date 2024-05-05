import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";

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