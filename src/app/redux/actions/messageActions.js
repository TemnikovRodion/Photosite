import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverApiUrl } from "../../assets/scripts/serverUrls";

// Имя редьюсера
const reducerName = 'message';

// Добавление элемента
export const sendMessage = createAsyncThunk(
    `${reducerName}/sendMessage`,
    async (item) => {
        const response = await fetch(serverApiUrl(reducerName), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(item)
        })

        return response.json();
    }
) // addElement