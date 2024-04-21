import { Request, Response } from "express";
import { prisma } from '../prisma/prisma-client'
import { genSalt, hash, compare } from 'bcrypt'
import { Prisma, User } from "@prisma/client";
import { sign } from 'jsonwebtoken'
import { CustomRequst } from "../Middleware/auth";


export const generateToken = (_id: Number) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const token = sign({ id: _id }, secret, { expiresIn: '30d' })

        return token;
    }
    catch (err) {
        console.log(err)
    }
}

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Все поля обязательны для заполнения" });

        const user = await prisma.user.findFirst({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "Пользователь не найден" });

        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Пользователь с такой почтой и паролем не найден"})
        const token = generateToken(user.userId);

        if (user && isPasswordCorrect && token)
            return res.status(200).json({ ...user, token });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Fatal error" + err });
    }
}


export const userRegister = async (req: Request, res: Response) => {
    try {
        const { firstName, surName, middleName, email, phone, password, dateOfBirth } = req.body;

        if (!firstName || !surName || !middleName || !email || !phone || !password || !dateOfBirth)
            return res.status(400).json({ message: "Все поля обязательны к заполнению" });

        const checkEmail = await prisma.user.findFirst({ where: { email } });
        if (checkEmail) return res.status(400).json({ message: "Пользователь с такой электронной почтой уже зарегистрирован" });

        const checkPhone = await prisma.user.findFirst<Prisma.UserFindFirstArgs>({ where: { phone } });
        if (checkPhone) return res.status(400).json({ message: "Пользователь с таким номером телефона уже зарегистрирован" });

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const birthDate = new Date(dateOfBirth);

        const userData: Prisma.UserCreateInput = {
            firstName,
            surName,
            middleName,
            email,
            phone,
            password: hashedPassword,
            dateOfBirth: birthDate,
            profilePhoto: ''
        };

        const user: User = await prisma.user.create({
            data: userData
        })
        const token = generateToken(user.userId);

        return res.status(200).json({ ...user, token })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error: " + err });
    }
}

export const userCurrent = async (req: Request, res: Response) => {
    try {
        return res.status(200).json((req as CustomRequst).user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal error " + err });
    }
}

export const changeRole = async (req: Request, res: Response) => {
    try {
        const { userId, role } = req.body;

        if (!userId)
            return res.status(404).json({ message: "Пользователь с таким идентификатором не обнаружен" })
        if (!role)
            return res.status(404).json({ message: "Роль с таким названием не обнаружена" });

        const user = await prisma.user.update<Prisma.UserUpdateArgs>({
            where: {
                userId: parseInt(userId)
            },
            data: {
                role: role
            }
        })

        await prisma.author.create<Prisma.AuthorCreateArgs>({data: {
            authorId: user.userId,
        }})

        return res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Fatal Error " + err })
    }
}


export const updateUser = async(req:Request, res: Response) => {
    try{
        const {surName, firstName, middleName, email, phone, password, dateOfBirth} = req.body;
        if(!req.file)
            return res.status(404).json({message: "Фотография профиля не найдена"});

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt);



        const user = await prisma.user.update<Prisma.UserUpdateArgs>({
            where: {
                email: email
            },
            data: {
                surName: surName,
                firstName: firstName,
                middleName: middleName,
                phone: phone,
                email: email,
                password: hashedPassword,
                dateOfBirth: new Date(dateOfBirth)!,
                profilePhoto: `http://localhost:${process.env.PORT}/static/${req.file?.filename}`
            }
        })

        console.log(req.file)

        return res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal Error" + err})
    }
}

export const deleteUser = async (req:Request, res: Response) => {
    try{
        const {userId} = req.body;

        const user = await prisma.user.findFirst({where: {userId: parseInt(userId)}});

        if(!user)
            return res.status(404).json({message: "Пользователь не найден"})

         await prisma.user.delete({where: {userId: parseInt(userId)}});
        
        return res.status(200).json({message: "Пользователь успешно удалён"});

    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: "Fatal Error " + err});
    }
}

// export const uploadImage = async(req: Request, res: Response) => {
//     try {
//         const {userId} = req.body;

//         if(!userId || !req.file)
//             return res.status(400).json({message: "Все поля обязательны к заполнению"});

//         let user = await prisma.user.findFirst({where: {userId: parseInt(userId)}});
//         if(!user)
//             return res.status(404).json({message: "Пользователь не найден"});

//         user = await prisma.user.update({where: {userId: parseInt(userId)}, data: {
//             profilePhoto: `http://localhost:${process.env.PORT}/images/${req.file?.filename}`
//         }})

//         return res.status(200).json({message: "Фотография профиля обновлена"});
//     }
//     catch(err) {
//         console.log(err);
//         res.status(500).json({messge: "Fatal Error " + err});
//     }
// }