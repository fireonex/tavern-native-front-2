import { useState } from "react";
import { useValidation } from "./useValidation";

export const useRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { errors, validateFields, setErrors } = useValidation();

    // Событие для изменения значения email
    const handleEmailChange = (email: string) => {
        setEmail(email);
    };

    // Валидация email на потере фокуса
    const handleEmailBlur = () => {
        const newErrors = validateFields({ email });
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    // Событие для изменения значения username
    const handleUsernameChange = (username: string) => {
        setUsername(username);
    };

    // Валидация username на потере фокуса
    const handleUsernameBlur = () => {
        const newErrors = validateFields({ username });
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    // Событие для изменения значения password
    const handlePasswordChange = (password: string) => {
        setPassword(password);
    };

    // Валидация password на потере фокуса
    const handlePasswordBlur = () => {
        const newErrors = validateFields({ password });
        setErrors(prev => ({ ...prev, ...newErrors }));
    };

    return {
        validateFields,
        email,
        password,
        username,
        errors,
        handleUsernameChange,
        handleUsernameBlur,
        handleEmailChange,
        handleEmailBlur,
        handlePasswordChange,
        handlePasswordBlur,
    };
};
