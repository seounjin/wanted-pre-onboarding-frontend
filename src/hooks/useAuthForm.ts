import { ChangeEvent, FormEvent, useState } from "react";


const useAuthForm = () => {

    const [authFormValue, setAuthFormValue] = useState({ email:'', password: '' });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthFormValue({...authFormValue, [event.target.id]: event.target.value });
    }
    
    return { authFormValue, handleSubmit, handleChange};
}

export default useAuthForm;