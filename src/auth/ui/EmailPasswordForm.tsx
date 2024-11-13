import React from 'react';
import { Text, TextInput } from "react-native";
import { authStyles } from "./styles/authStyles";
import { FormErrors } from "../model/useValidation";
import {Typography} from "../../common/components/Typography";

type Props = {
    email: string;
    password: string;
    handleEmailChange: (email: string) => void;
    handlePasswordChange: (password: string) => void;
    handleEmailBlur: () => void;
    handlePasswordBlur: () => void;
    errors: FormErrors;
};

export const EmailPasswordForm = ({ email, password, handleEmailChange, handlePasswordChange, handleEmailBlur, handlePasswordBlur, errors }: Props) => {
    return (
        <>
            <TextInput
                style={authStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur} // Обработчик потери фокуса
            />
            {errors.email && <Typography text={errors.email} variant={'error'}/>}
            <TextInput
                style={authStyles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur} // Обработчик потери фокуса
            />
            {errors.password && <Typography text={errors.password} variant={'error'}/>}
        </>
    );
};
