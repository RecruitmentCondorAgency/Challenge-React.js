import { University } from "../types/university";

export const validateFavUni = (university: University, list: University[]): boolean => {
    return list.some(uni => university.name === uni.name)
}