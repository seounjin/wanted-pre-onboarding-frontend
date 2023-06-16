import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../api/fetcher";
import AuthForm from "../components/AuthForm/AuthForm"
import useAuthForm from "../hooks/useAuthForm";
import MainLayout from "../Layout/MainLayout/MainLayout"
import { setAccessToken } from "../utils/setAccessToken";
import { validateEmailAndPassword } from "../utils/validateEmailAndPassword";

const SigninPage = () => {
    const navigate = useNavigate();

    const { authFormValue: { email, password }, handleChange} = useAuthForm();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const res = await fetcher('post', '/auth/signin', { email, password });
        if (res?.status === 200) {
            setAccessToken('accessToken', res.data.access_token);
            navigate('/todo')
        }
    }

    return (
        <MainLayout>
          <AuthForm
            title={'로그인'}
            buttonTestId={'signin-button'}
            buttonName={'로그인'}
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            isDisabledButton={validateEmailAndPassword(email, password)}
          />
        </MainLayout>
    );  
}

export default SigninPage;