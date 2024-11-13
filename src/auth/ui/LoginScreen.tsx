import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View,} from 'react-native';
import {useLoginUserMutation} from "../api/authApi";
import {authStyles} from "./styles/authStyles";

import {EmailPasswordForm} from "./EmailPasswordForm";
import {useRegistration} from "../model/useRegistartion";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {useDispatch} from "react-redux";
import {authSlice} from "../model/authSlice";
import {Button} from "../../common/components/Button";
import {InlineButton} from "../../common/components/InlineButton";
import {Typography} from "../../common/components/Typography";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


export const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [loginUser, {isLoading, isSuccess, error: apiError}] = useLoginUserMutation();
    const {
        email,
        password,
        errors,
        validateFields,
        handleEmailChange,
        handlePasswordChange,
        handleEmailBlur,
        handlePasswordBlur
    } = useRegistration()

    const dispatch = useDispatch();

    const handleLogin = async () => {
        const fieldsToValidate = {email, password};
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await loginUser({email, password}).unwrap();
                dispatch(authSlice.actions.setToken(response.token));
                navigation.navigate('UserPage', {
                    userId: response.userId,
                    username: response.username,
                });
            } catch (err) {
                console.error('Failed to login:', err);
            }
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={authStyles.container}>
                    <View style={{marginBottom: 50}}>
                        <Typography text={'Login'} variant={'title'}/>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}
                                               handleEmailBlur={handleEmailBlur} handlePasswordBlur={handlePasswordBlur}
                            />
                        </View>
                        <Button onPress={handleLogin} disabled={isLoading} text={'Login'}/>
                    </View>
                    {isSuccess && <Typography text={'Login successful!'} variant={'regularCenter'}/>}
                    {apiError && (
                        <Typography text={(apiError as any).data?.message || "An error occurred during login"}
                                    variant={'error'}/>
                    )}
                    <View style={authStyles.smallContainer}>
                        <Typography text={'Don\'t have an account?'} variant={'regularCenter'}/>
                        <InlineButton onPress={() => navigation.navigate('Register')} disabled={isLoading}
                                      text={'Register'}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


