import { getAccessToken } from "../utils/getAccessToken";
import { axiosClient } from "./axiosClient";


export const getTodoItems = async () => {
    const accessToken = getAccessToken('accessToken');
    axiosClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    return await axiosClient.get('/todos');
};

export const createTodoItem = async (todoItem: string) => {
    return await axiosClient.post('/todos', { todo: todoItem });
};

export const deleteTodoItem = async (id: number) => {
    return await axiosClient.delete(`/todos/${id}`);
};

export const updateTodoItem = async (id: number, todo: string, isCompleted: boolean) => {
    return await axiosClient.put(`/todos/${id}`, { todo, isCompleted });
};