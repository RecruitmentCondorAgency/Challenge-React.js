import axios from "axios";


const URL = "http://localhost:3000";

export const getUniversities = async (): Promise<any> => {

    return await axios.get(`${URL}/universities`).then(({ data }) => {
        return data;    
    });
}

