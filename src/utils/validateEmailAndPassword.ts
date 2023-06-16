
export const validateEmailAndPassword = (email: string, password: string): boolean => {
    return !(/.*@.*/.test(email) && password.length >= 8);
}