import React from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useRegisterUserMutation} from "../api/authApi";
import {useRegistration} from "../model/useRegistartion";
import {authStyles} from "./styles/authStyles";
import {EmailPasswordForm} from "./EmailPasswordForm";
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";

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

    const handleRegister = async () => {
        const fieldsToValidate = {email, password, username};
        const newErrors = validateFields(fieldsToValidate);

        if (Object.keys(newErrors).length === 0) {
            try {
                const result = await registerUser({username, email, password}).unwrap();
                //navigation.navigate('UserPage', { userId: result.userId, token: result.token });
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
                        <Text style={authStyles.title}>Register</Text>
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
                            {errors.username && <Text style={authStyles.errorText}>{errors.username}</Text>}


                            <EmailPasswordForm password={password} email={email} handleEmailChange={handleEmailChange}
                                               handlePasswordChange={handlePasswordChange} errors={errors}
                                               handleEmailBlur={handleEmailBlur} handlePasswordBlur={handlePasswordBlur}
                            />
                        </View>
                        <TouchableOpacity style={authStyles.customButton} onPress={handleRegister} disabled={isLoading}>
                            <Text style={authStyles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isSuccess && <Text style={authStyles.successText}>Register successful!</Text>
                    }
                    {
                        apiError && (
                            <Text style={authStyles.errorText}>
                                {(apiError as any).data?.message || "An error occurred during registration"}
                            </Text>
                        )
                    }
                    <View style={authStyles.smallContainer}>
                        <Text style={authStyles.successText}>Already have an account?</Text>
                        <TouchableOpacity style={{marginTop: 5}}
                                          onPress={() => navigation.navigate('Login')}
                                          disabled={isLoading}>
                            <Text style={authStyles.inlineButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
