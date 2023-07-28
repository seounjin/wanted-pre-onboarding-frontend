import { getAccessToken } from "../utils/getAccessToken";
import { axiosClient } from "./axiosClient";


export const getTodoItems =  () => {
    const accessToken = getAccessToken('accessToken');
    axiosClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    return axiosClient.get('/todos');
};

export const createTodoItem =  (todoItem: string) => {
    return axiosClient.post('/todos', { todo: todoItem });
};

export const deleteTodoItem =  (id: number) => {
    return axiosClient.delete(`/todos/${id}`);
};

export const updateTodoItem =  (id: number, todo: string, isCompleted: boolean) => {
    return axiosClient.put(`/todos/${id}`, { todo, isCompleted });
};