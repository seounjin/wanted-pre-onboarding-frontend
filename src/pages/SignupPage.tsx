import AuthForm from "../components/AuthForm/AuthForm"
import useAuthForm from "../hooks/useAuthForm";
import MainLayout from "../Layout/MainLayout/MainLayout"
import { validateEmailAndPassword } from "../utils/validateEmailAndPassword";

const SignupPage = () => {

    const { authFormValue, handleSubmit, handleChange} = useAuthForm();

    return (
        <MainLayout>
          <AuthForm
            title={'회원가입'}
            buttonTestId={'signup-button'}
            buttonName={'회원가입'}
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            isDisabledButton={validateEmailAndPassword(authFormValue.email, authFormValue.password)}
          />
        </MainLayout>
    );  
}

export default SignupPage;