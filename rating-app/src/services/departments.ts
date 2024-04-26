import { API_BASE_URL } from "../environments/environment";

export interface DepartmentRequest{
    name: string;
}

export const getAllDepartments = async () =>{
    const response = await fetch(API_BASE_URL + "Departments");

    return response.json();
}

export const getDepartment = async (id: string) =>{
    const response = await fetch(API_BASE_URL + "Departments/" + id);

    return response.json();
}

export const createDepartment = async (departmentRequest: DepartmentRequest) =>{
    const token = localStorage.getItem('auth-token');

    const response = await fetch(API_BASE_URL + "Departments/",{
        method: "POST",
        headers:{
            "content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(departmentRequest),
    });

    return response;
}