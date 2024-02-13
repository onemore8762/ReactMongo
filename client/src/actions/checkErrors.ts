import axios from "axios";

export function checkErrors(error: never | unknown){
    let errorMessage = "Произошла ошибка";
    if (axios.isAxiosError(error)) {
        errorMessage = error?.response?.data.message;
    }
    console.log(errorMessage)
    console.log(error)
}
