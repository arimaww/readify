import { SubmitHandler, useForm } from 'react-hook-form';
import BookForm from '../../components/BookForm'
import { IBookInputs } from '../../types';
import { useState } from 'react';
import { useGetAllCategoriesQuery, useGetAllTypesQuery, useGetBookByIdQuery, useUpdateBookMutation } from '../../app/services/book';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useSnackbar } from 'notistack';
import { ISelectOptions } from '../AddBook';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { useParams } from 'react-router-dom';
import { Book } from '../../features/book/book';

const EditBook = () => {
    const { register, handleSubmit, control } = useForm<IBookInputs>();
    const [error, setError] = useState<string>();
    const [image, setImage] = useState<File | null>();
    const [file, setFile] = useState<File | null>();

    const { bookId } = useParams();


    const bookData = useGetBookByIdQuery({bookId: parseInt(bookId as string)});
    const [updateBook, resultUpdateBook] = useUpdateBookMutation();

    const types = useGetAllTypesQuery();
    const categories = useGetAllCategoriesQuery();
    const user = useSelector(selectUser);

    const { enqueueSnackbar } = useSnackbar();

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

    const book = async (data: IBookInputs) => {
        console.log(data)
        try {
            const languages = ["RUSSIAN", "ENGLISH", "DUTCH", "AZERBAIJANIAN"]
            const formData = new FormData;
            formData.append("bookId", bookId!);
            formData.append("bookName", data.bookName)
            formData.append("about", data.about)
            formData.append("description", data.description)
            formData.append("typeId", data.typeId ? data.typeId.toString() : bookData.data?.typeId.toString()!)
            formData.append("categoryId", data.categoryId ? data.categoryId.toString() : bookData.data?.categoryId.toString()!)
            formData.append("cost", data.cost.toString())
            formData.append("language", languages[parseInt(data.language)] ?? bookData.data?.language)
            formData.append("file1", file!)
            formData.append("file1", image!)
            
            await updateBook(formData as any).unwrap();


            enqueueSnackbar("Ифнормация книги успешно обновлена", {variant: "success"});
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

    const onSubmit: SubmitHandler<IBookInputs> = (data: IBookInputs) => book(data);

    return (
        <Book>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <BookForm
                    loading={true}
                    book={bookData.data}
                    title="Страница обновления книги"
                    setFile={setFile}
                    categoryOptions={categoryOptions}
                    control={control}
                    error={error}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    register={register}
                    resultCreateBook={resultUpdateBook}
                    setImage={setImage}
                    typeOptions={typeOptions}
                    user={user}
                    bookCategories={categories.data}
                    bookTypes={types.data}
                    buttonTitle='Сохранить'
                />
            </div>
        </Book>

    )
}

export default EditBook