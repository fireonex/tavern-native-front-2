import React from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useRegisterUserMutation} from "../api/authApi";
import {useRegistration} from "../model/useRegistartion";
import {authStyles} from "./styles/authStyles";
import {EmailPasswordForm} from "./EmailPasswordForm";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {Button} from "../../common/components/Button";
import {InlineButton} from "../../common/components/InlineButton";
import {Typography} from "../../common/components/Typography";
import {useDispatch} from "react-redux";
import {authSlice} from "../model/authSlice";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export const RegistrationScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [registerUser, {isLoading, isSuccess, error: apiError}] = useRegisterUserMutation();
    const {
        email,
        password,
        username,
        errors,
        validateFields,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleUsernameBlur,
        handleEmailBlur,
        handlePasswordBlur
    } = useRegistration()

    const dispatch = useDispatch();

    const handleRegister = async () => {
        const fieldsToValidate = {email, password, username};
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await registerUser({username, email, password}).unwrap();

                dispatch(authSlice.actions.setToken(result.token));

                dispatch(authSlice.actions.setUserInfo({
                    userId: result.userId,
                    username: result.username,
                }));

                navigation.navigate('UserPage', {
                    userId: result.userId,
                    username: result.username,
                });
            } catch (err) {
                console.error('Failed to register:', err);
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
                <View style={authStyles.container}>
                    <View style={{marginBottom: 50}}>
                        <Typography text={'Register'} variant={'title'}/>
                    </View>
                    <View>
                        <View style={authStyles.inputsContainer}>
                            <TextInput
                                style={authStyles.input}
                                placeholder="Username"
                                value={username}
                                onChangeText={handleUsernameChange}
                                onBlur={handleUsernameBlur}
                            />
                            {errors.username && <Typography text={errors.username} variant={'error'}/>}
                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}
                                               handleEmailBlur={handleEmailBlur} handlePasswordBlur={handlePasswordBlur}
                            />
                        </View>
                        <Button onPress={handleRegister} disabled={isLoading} text={'Register'}/>
                    </View>
                    {isSuccess && <Typography text={'Register successful!'} variant={'regularCenter'}/>}
                    {
                        apiError && (
                            <Typography text={(apiError as any).data?.message || "An error occurred during registration"}
                                        variant={'error'}/>
                        )
                    }
                    <View style={authStyles.smallContainer}>
                        <Typography text={'Already have an account?'} variant={"regularCenter"}/>
                        <InlineButton onPress={() => navigation.navigate('Login')} disabled={isLoading} text={'Login'}/>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
