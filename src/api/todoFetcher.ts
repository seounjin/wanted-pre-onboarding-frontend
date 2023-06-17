import { getAccessToken } from "../utils/getAccessToken";
import { axiosClient } from "./axiosClient";


export const getTodoItems = async () => {
    const accessToken = getAccessToken('accessToken');
    axiosClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    return await axiosClient.get('/todos');
};

export const createTodoItems = async (todoItem: string) => {
    return await axiosClient.post('/todos', { todo: todoItem });
};
