export const isCodeCorrect = (code: number, inputCode: string): boolean => {
    if (code === Number(inputCode))
        return true;
    return false;
}