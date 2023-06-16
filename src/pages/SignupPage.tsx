import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../api/fetcher";
import AuthForm from "../components/AuthForm/AuthForm"
import useAuthForm from "../hooks/useAuthForm";
import MainLayout from "../Layout/MainLayout/MainLayout"
import { validateEmailAndPassword } from "../utils/validateEmailAndPassword";

const SignupPage = () => {
    const navigate = useNavigate();

    const { authFormValue: { email, password }, handleChange} = useAuthForm();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await fetcher('post', '/auth/signup', { email, password });
        if (res?.status === 201) {
            navigate('/signin')
        }
    }

    return (
        <MainLayout>
          <AuthForm
            title={'회원가입'}
            buttonTestId={'signup-button'}
            buttonName={'회원가입'}
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            isDisabledButton={validateEmailAndPassword(email, password)}
          />
        </MainLayout>
    );  
}

export default SignupPage;