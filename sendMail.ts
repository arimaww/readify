import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const transporter = nodemailer.createTransport({
    service: 'mail',
    host: "smtp.mail.ru",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER!,
        pass: process.env.MAIL_PASS!,
    }
})

export const sendCodeToUser = async (code: number, toWhom: string) => {
    await transporter.sendMail({
        from: {
            name: 'Readify',
            address: process.env.MAIL_USER!
        },
        to: toWhom,
        subject: "Ваш код подтверждения",
        text: code?.toString(),
        html: `<p>Код: <b>${code}</b><p>`,
    })
}