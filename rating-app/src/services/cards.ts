import { API_BASE_URL } from "../environments/environment";

export interface CardRequest{
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    birthday: Date;
    position: number;
    departmentID: string;
}

export interface CardFilterRequest{
    query: string;
    idDepartment: string;
}

export const getAllCards = async () =>{
    const response = await fetch(API_BASE_URL + "Cards");

    return response.json();
}

export const getCard = async (id: string) =>{
    const response = await fetch(API_BASE_URL + "Cards/" + id);

    return response.json();
}

export const getFilteredCards = async (query: string, idDepartment: string) =>{
    let queryParams;

    if (idDepartment !== undefined) {
        queryParams = new URLSearchParams({ query, idDepartment });
    } else {
        queryParams = new URLSearchParams({ query });
    }

    const response = await fetch(`${API_BASE_URL}Cards/filter/?${queryParams}`,{
        method: "GET",
        headers:{
            "content-type": "application/json"
        },
    });

    return response.json();
}

export const createCard = async (cardRequest: CardRequest) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Cards/",{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cardRequest),
    });

    return response;
}

export const updateCard = async (id: string, cardRequest: CardRequest) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Cards/" + id,{
        method: "PUT",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cardRequest),
    });

    return response;
}

export const upCard = async (id: string) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Cards/up/" + id,{
        method: "PUT",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export const downCard = async (id: string) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Cards/down/" + id,{
        method: "PUT",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}

export const deleteCard = async (id: string) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Cards/" + id,{
        method: "DELETE",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    return response;
}