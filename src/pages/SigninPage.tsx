import AuthForm from "../components/AuthForm/AuthForm"
import useAuthForm from "../hooks/useAuthForm";
import MainLayout from "../Layout/MainLayout/MainLayout"
import { validateEmailAndPassword } from "../utils/validateEmailAndPassword";

const SigninPage = () => {

    const { authFormValue, handleSubmit, handleChange} = useAuthForm();

    return (
        <MainLayout>
          <AuthForm
            title={'로그인'}
            buttonTestId={'signin-button'}
            buttonName={'로그인'}
            onSubmit={handleSubmit}
            onInputChange={handleChange}
            isDisabledButton={validateEmailAndPassword(authFormValue.email, authFormValue.password)}
          />
        </MainLayout>
    );  
}

export default SigninPage;