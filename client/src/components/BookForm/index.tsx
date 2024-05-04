import { Control, Controller, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import styles from './BookForm.module.scss'
import { IBookInputs } from '../../types'
import { ISelectOptions } from '../../pages/AddBook'
import Select from 'react-select'
import { Book, BookType, Categories, User } from '@prisma/client'

type TBookForm = {
    loading: boolean,
    title: string,
    handleSubmit: UseFormHandleSubmit<IBookInputs, undefined>,
    onSubmit: SubmitHandler<IBookInputs>,
    register: UseFormRegister<IBookInputs>,
    typeOptions: ISelectOptions[],
    control: Control<IBookInputs> | undefined,
    categoryOptions: ISelectOptions[]
    resultCreateBook: any,
    error: string | undefined,
    setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>
    setImage: React.Dispatch<React.SetStateAction<File | null | undefined>>,
    user: User | null,
    book?: Book | null,
    bookTypes?: BookType[] | undefined,
    bookCategories?: Categories[] | undefined,
    buttonTitle: string
}

const BookForm = ({ loading,
    title,
    handleSubmit,
    buttonTitle,
    onSubmit, register, typeOptions, control, categoryOptions, resultCreateBook, error, setFile, setImage, book, bookCategories, bookTypes }: TBookForm) => {
    if (loading) {
        if (!bookTypes && !bookCategories) return <div>Загрузка...</div>
    }

    let typeSelectOptions: ISelectOptions | null = null;
    if (typeof bookTypes !== 'undefined' && typeof typeOptions !== 'undefined') {
        for (let i = 0; i < typeOptions!.length; i++) {
            if (book?.typeId === typeOptions[i].value) {
                typeSelectOptions = typeOptions[i];
            }
        }
    }

    let categoriesSelectOptions: ISelectOptions | null = null;
    if (typeof bookCategories !== 'undefined' && typeof categoryOptions !== 'undefined') {
        for (let i = 0; i < categoryOptions!.length; i++) {
            if (book?.categoryId === categoryOptions[i].value) {
                categoriesSelectOptions = categoryOptions[i];
            }
        }
    }

    let languages: ISelectOptions[] | null = [
        {
            label: "Russian",
            value: 0
        },
        {
            label: "English",
            value: 1
        },
        {
            label: "Dutch",
            value: 2
        },
        {
            label: "Azerbaijanian",
            value: 3
        },
    ]

    if (typeof bookCategories !== 'undefined' && typeof categoryOptions !== 'undefined') {
        for (let i = 0; i < categoryOptions!.length; i++) {
            if (book?.categoryId === categoryOptions[i].value) {
                categoriesSelectOptions = categoryOptions[i];
            }
        }
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h3>{title}</h3>
            <div className={styles.form__item}>
                <label htmlFor="bookName">Название</label>
                <input type="text" id="bookName" {...register("bookName")} defaultValue={book?.bookName} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="about">О книге</label>
                <textarea id='about' cols={20} rows={5} {...register("about")} defaultValue={book?.about} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="description">Описание</label>
                <textarea id='description' cols={20} rows={10} {...register("description")} defaultValue={book?.description} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="typeId">Тип</label>
                <Controller name='typeId' control={control} render={({ field: { onChange, value } }) => (
                    <Select options={typeOptions} id='typeId' className={styles.form__selectBlinking} value={typeOptions.find(c => c.value === value)} defaultValue={typeSelectOptions}
                        onChange={(val) => onChange(val?.value)} />
                )} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="language">Язык</label>
                <Controller name='language' control={control} render={({ field: { onChange } }) => (
                    <Select options={languages} id='language' tabSelectsValue defaultValue={languages.find(el => {
                        return (
                            el.label.toUpperCase() === book?.language
                        )

                    })} className={styles.form__selectBlinking}
                        onChange={(val) => onChange(val?.value)} />
                )} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="categoryId">Категория</label>
                <Controller name='categoryId' control={control} render={({ field: { onChange, value } }) => (

                    <Select options={categoryOptions} id='categoryId'
                        value={categoryOptions.find((c) => c.value === value)} defaultValue={categoriesSelectOptions} className={styles.form__selectBlinking}
                        onChange={(val) => onChange(val?.value)} />
                )} />

            </div>

            <div className={styles.form__item}>
                <label htmlFor="cost">Стоимость</label>
                <input type="number" id="cost" {...register("cost")} defaultValue={book?.cost} />
            </div>
            <div className={styles.form__item}>
                <label htmlFor="image">Картинка</label>
                <input type="file" id="image" className={styles.image} {...register("picture")} accept="image/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.files ? e.target.files[0] : null)} />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="file">Файл</label>
                <input type="file"
                    id='file'
                    className={styles.file}
                    {...register("file")}
                    name='file1'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                    multiple />
            </div>

            <button className={styles.button}>
                {resultCreateBook.isLoading ? "Загрузка..." : `${buttonTitle}`}
            </button>

            {error ? <p style={{ width: "400px", display: "flex", justifyContent: "center" }}>Ошибка: {error}</p> : <p></p>}
        </form>
    )
}

export default BookForm