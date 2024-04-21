import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { prisma } from '../prisma/prisma-client';

export interface CustomRequst extends Request {
    user: User
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({message: "Токен отсутствует"});
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    const user: User | null = await prisma.user.findUnique({
      where: {
        userId: decoded.id,
      },
    });

    if (!user) {
        return res.status(404).json({message: "Пользователь не найден"})
    }
    
    (req as CustomRequst).user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};