import { axiosClient } from "./axiosClient"


export const signup = async(email: string, password: string) => {
    return await axiosClient.post('/auth/signup', { email, password });
}

export const singin = async(email: string, password: string) => {
    return await axiosClient.post('/auth/signin', { email, password });
}