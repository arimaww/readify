import { Request, Response } from "express";
import { sendCodeToUser } from "../sendMail";

export const sendCodeToUserMail = async (req: Request, res: Response) => {
    try {
        const { code, toWhom } = req.body;

        sendCodeToUser(code, toWhom).catch(err => { if (err) return res.status(404).json({ message: "Такой email несуществует" }) });


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error " + err });
    }
}