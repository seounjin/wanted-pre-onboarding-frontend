import { ChangeEvent, FormEvent, useState } from "react";


const useAuthForm = () => {

    const [authFormValue, setAuthFormValue] = useState({ email:'', password: '' });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAuthFormValue({...authFormValue, [event.target.id]: event.target.value });
    }
    
    return { authFormValue, handleChange};
}

export default useAuthForm;