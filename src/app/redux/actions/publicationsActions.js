import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverApiUrl } from "../../assets/scripts/serverUrls";

// Имя редьюсера
const reducerName = 'publications';

// Получение списка элементов
export const getElements = createAsyncThunk(
    `${reducerName}/getElements`,
    async () => {
        const response = await fetch(serverApiUrl(reducerName), {
            method: "GET"
        });

        return response.json();
    }
)

// Добавление элемента
export const addElement = createAsyncThunk(
    `${reducerName}/addElement`,
    async (item) => {
        const response = await fetch(serverApiUrl(reducerName), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(item)
        })

        return response.json();
    }
) // addElement

// Редактирование элемента
export const editElement = createAsyncThunk(
    `${reducerName}/editElement`,
    async (item) => {
        const response = await fetch(serverApiUrl(reducerName), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },
            method: "PUT",
            credentials: 'include',
            body: JSON.stringify(item)
        })

        return response.json();
    }
) // editElement

// Удаление элемента
export const deleteElement = createAsyncThunk(
    `${reducerName}/deleteElement`,
    async (item) => {
        const response = await fetch(serverApiUrl(reducerName), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },
            method: "DELETE",
            credentials: 'include',
            body: JSON.stringify(item)
        })

        return response.json();
    }
) // deleteElement