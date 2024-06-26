import { Request, Response } from 'express';
import {prisma} from '../prisma/prisma-client'


export const getBookRatingsById = async (req: Request, res:Response) => {
    try{
        const {bookId} = req.body;

        if(!bookId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"})
        const ratings = await prisma.rating.findMany({where: {
            bookId: parseInt(bookId)
        }})

        return res.status(200).json(ratings)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    } 
}

export const getAllRatings = async (req: Request, res:Response) => {
    try{
        const ratings = await prisma.rating.findMany();

        return res.status(200).json(ratings)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    } 
}


export const setRating = async (req: Request, res:Response) => {
    try{
        const {userId, bookId, value} = req.body;

        if(!userId || !bookId || !value)
            return res.status(400).json({message: "Все поля обязательны к заполнению"})

        let rating = await prisma.rating.findFirst({where: {
            userId: parseInt(userId),
            bookId: parseInt(bookId),
            value: parseFloat(value)
        }})
        if(rating)
            return res.status(400).json({message: "Оценка уже поставлена"});

        rating = await prisma.rating.create({data: {
            bookId: parseInt(bookId),
            userId: parseInt(userId),
            value: parseFloat(value)
        }})

        return res.status(200).json(rating)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}

export const removeRating = async (req: Request, res: Response) => {
    try {
        const {bookId, userId} = req.body;

        if(!bookId || !userId)
            return res.status(200).json({message: "Все поля обязательно к заполнению"});
        await prisma.rating.deleteMany({where: {
            bookId: parseInt(bookId),
            userId: parseInt(userId)
        }})
        return res.status(200).json({message: "Рейтинг успешно удалён"})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}

export const leaveComment = async (req: Request, res: Response) => {
    try{
        const {userId, bookId, text} = req.body;
        if(!userId || !bookId || !text)
            return res.status(400).json({message: "Все поля обязательны к заполнению"});
        let comment = await prisma.comments.findFirst({
            where: {
                bookId: parseInt(bookId),
                userId: parseInt(userId)
            }
        })
        if(comment)
            return res.status(400).json({message: "Вы уже оставляли комментарий к этой книге."})
        comment = await prisma.comments.create({
            data: {
                text: text,
                bookId: parseInt(bookId),
                userId: parseInt(userId)
            }
        })

        return res.status(200).json(comment)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}

export const removeComment = async (req: Request, res: Response) => {
    try{
        const {commentId} = req.body;

        if(!commentId)
            return res.status(400).json({message: "Все поля обязательны к заполнению"});

        await prisma.comments.delete({
            where: {
                commentId: parseInt(commentId)
            }
        })

        return res.status(200).json({message: "Комментарий успешно удалён"});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}


export const getAllCommentsForBook = async (req: Request, res: Response) => {
    try{
        const {bookId} = req.body;

        const comments = await prisma.comments.findMany({where: {
            bookId: parseInt(bookId)
        }})

        return res.status(200).json(comments)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal error " + err});
    }
}