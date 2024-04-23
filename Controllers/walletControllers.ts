import { Request, Response } from "express";
import { prisma } from "../prisma/prisma-client";


export const setWalletValue = async (req: Request, res: Response) => {
    try {
        const { userId, value } = req.body;

        const setWallet = await prisma.user.update({
            where: { userId: parseInt(userId) }, data: {
                wallet: Number(value)
            }
        })

        return res.status(200).json(setWallet);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({message: "Fatal error " + err})
    }
}