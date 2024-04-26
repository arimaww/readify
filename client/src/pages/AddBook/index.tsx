import styles from './AddBook.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateBookMutation, useGetAllCategoriesQuery, useGetAllTypesQuery } from '../../app/services/book'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { IBookInputs } from '../../types'
import AddBookForm from '../../components/BookForm'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { LoadingPage } from '../../components/LoadingPage'

export interface ISelectOptions {
    value: number,
    label: string,
}

const AddBook = () => {
    const { register, handleSubmit, control } = useForm<IBookInputs>();
    const [book, resultCreateBook] = useCreateBookMutation();
    const [error, setError] = useState<string>();
    const [image, setImage] = useState<File | null>();
    const [file, setFile] = useState<File | null>();

    const types = useGetAllTypesQuery();
    const categories = useGetAllCategoriesQuery();
    const user = useSelector(selectUser);

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const typeOptions: ISelectOptions[] = [];
    for (let i = 0; i < (types.data?.length ? types.data?.length : 1); i++) {
        if (typeof types.data !== "undefined") {
            typeOptions.push({ value: types.data[i].typeId, label: types.data[i].typeName })
        }
    }
    const categoryOptions: ISelectOptions[] = [];
    for (let i = 0; i < (categories.data?.length ? categories.data?.length : 1); i++) {
        if (typeof categories.data !== "undefined") {
            categoryOptions.push({ value: categories.data[i].categoryId, label: categories.data[i].categoryName })
        }
    }


    const createBook = async (data: IBookInputs) => {
        try {
            const languages = ["RUSSIAN", "ENGLISH", "DUTCH", "AZERBAIJANIAN"];
            const formData = new FormData();
            formData.append("bookName", data.bookName);
            formData.append("about", data.about);
            formData.append("description", data.description);
            formData.append("typeId", data.typeId.toString());
            formData.append("categoryId", data.categoryId.toString());
            formData.append("cost", data.cost.toString());
            formData.append("language", languages[parseInt(data.language)]);
            formData.append("authorId", user?.userId.toString()!)
            formData.append('file1', file!);
            formData.append('file1', image!);


            await book(formData as any).unwrap();

            enqueueSnackbar("Книга успешно добавлена", { variant: "success" });
            navigate(`author_cabinet/${user?.userId}`);
        }
        catch (err) {
            if (isErrorWithMessage(err)) {
                setError(err.data.message);
            }
            else {
                setError("Неизвестная ошибка");
            }
        }
    }
    const onSubmit: SubmitHandler<IBookInputs> = data => {
        createBook({ ...data, authorId: user!.userId })
    }


    if(!categoryOptions || !control || !user || !typeOptions)
        return <LoadingPage />


    return (
        <div className={styles.addbook}>
            <AddBookForm
                loading={false}
                title='Страница добавления книги'
                categoryOptions={categoryOptions}
                control={control}
                error={error}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                resultCreateBook={resultCreateBook}
                setFile={setFile}
                setImage={setImage}
                typeOptions={typeOptions}
                user={user}
                buttonTitle='Добавить'
            />
        </div>
    )
}

export default AddBook