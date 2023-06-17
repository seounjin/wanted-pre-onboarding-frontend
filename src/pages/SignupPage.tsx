import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authFetcher";
import AuthForm from "../components/AuthForm/AuthForm"
import useAuthForm from "../hooks/useAuthForm";
import AuthLayout from "../Layout/AuthLayout/AuthLayout"
import { validateEmailAndPassword } from "../utils/validateEmailAndPassword";

const SignupPage = () => {
    const navigate = useNavigate();

    const { authFormValue: { email, password }, handleChange} = useAuthForm();

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const res = await signup(email, password);
        if (res?.status === 201) {
            navigate('/signin')
        }
    }

    return (
        <AuthLayout>
          <AuthForm
            title={'회원가입'}
            buttonTestId={'signup-button'}
            buttonName={'회원가입'}
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            isDisabledButton={validateEmailAndPassword(email, password)}
          />
        </AuthLayout>
    );  
}

export default SignupPage;