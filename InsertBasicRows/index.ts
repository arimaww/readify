import {prisma} from '../prisma/prisma-client';

export const insertBasicRows = async () => {
    const hasCategoryRows = await prisma.categories.findMany();
    const hasTypeRows = await prisma.bookType.findMany();
    if (hasCategoryRows.length === 0) {
        await prisma.categories.createMany({
            data: [
                { categoryName: "Детективы" },
                { categoryName: "Фантастика" },
                { categoryName: "Фэнтези" },
                { categoryName: "Любовные романы" },
                { categoryName: "Менеджмент" },
                { categoryName: "Книги о войне" },
                { categoryName: "Книги о путешествиях" },
                { categoryName: "Работа с клиентами" },
                { categoryName: "Саморазвитие" },
            ]
        })
    }
    if (hasTypeRows.length === 0) {
        await prisma.bookType.createMany({
            data: [
                { typeName: 'Текст' },
                { typeName: 'Аудио' }
            ]
        })
    }
}