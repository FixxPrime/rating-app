import { API_BASE_URL } from "../environments/environment";

export const getInformation = async () =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Users/getInformation/",{
        method: "GET",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    return response.json();
}