import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { singin } from "../api/authFetcher";
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
        
        const res = await singin(email, password);
        if (res?.status === 200) {
            setAccessToken('accessToken', res.data.access_token);
            navigate('/todo', { replace: true })
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