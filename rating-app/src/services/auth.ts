import { API_BASE_URL } from "../environments/environment";

export interface UserRequestLogin{
    login: string;
    password: string;
}

export interface UserRequestRegister{
    username: string;
    login: string;
    password: string;
}

export const registerUser = async (userRequest: UserRequestRegister) =>{
    const response = await fetch(API_BASE_URL + "Users/register/",{
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
    });

    return response;
}

export const loginUser = async (userRequest: UserRequestLogin) =>{
    const response = await fetch(API_BASE_URL + "Users/login/",{
        method: "POST",
        headers:{
            "content-type": "application/json",
        },
        body: JSON.stringify(userRequest),
    });

    return response;
}