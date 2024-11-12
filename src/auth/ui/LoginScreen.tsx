import React from 'react';
import {Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import {useLoginUserMutation} from "../api/authApi";
import {authStyles} from "./styles/authStyles";

import {EmailPasswordForm} from "./EmailPasswordForm";
import {useRegistration} from "../model/useRegistartion";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {useDispatch} from "react-redux";
import {authSlice} from "../model/authSlice";

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
        const fieldsToValidate = { email, password };
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await loginUser({ email, password }).unwrap();
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
                        <Text style={authStyles.title}>Login</Text>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}
                                               handleEmailBlur={handleEmailBlur} handlePasswordBlur={handlePasswordBlur}
                            />
                        </View>
                        <TouchableOpacity style={authStyles.customButton} onPress={handleLogin} disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {isSuccess && <Text style={authStyles.successText}>Login successful!</Text>}
                    {apiError && (
                        <Text style={authStyles.errorText}>
                            {(apiError as any).data?.message || "An error occurred during login"}
                        </Text>
                    )}
                    <View style={authStyles.smallContainer}>
                        <Text style={authStyles.successText}>Don't have an account?</Text>
                        <TouchableOpacity style={{marginTop: 5}}
                                          onPress={() => navigation.navigate('Register')}
                                          disabled={isLoading}>
                            <Text style={authStyles.inlineButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};


