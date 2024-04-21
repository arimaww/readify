export type ErrorWithMessage = {
    status: number
    data: {
        message: string
    }
}

export interface ImageType {
    dataURL?: string;
    file?: File;
    [key: string]: any;
}

export type TUserInputs = {
    surName: string
    firstName: string
    middleName: string
    email: string
    phone: string
    password: string
    dateOfBirth: Date
}

export type IBookInputs = {
    bookName: string;
    about: string;
    description: string;
    typeId: number;
    authorId: number;
    language: string;
    categoryId: number;
    cost: number;
    picture: string | null;
    file: string;
}
  
  export declare type ImageListType = Array<ImageType>;