import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import tw from 'twrnc';
import {Alert} from "../../common/components/Alert";
import {useCharacterFormContext} from "../model/useCharacterContext";
import {CharacterForm} from "./CharacterForm";


export const CreateCharacterScreen = () => {

    const {
        alertMessage,
        alertVisible,
        alertType,
        setAlertVisible,
    } = useCharacterFormContext();


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <CharacterForm operation={'Create'}/>

            {alertVisible && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    visible={alertVisible}
                    onDismiss={() => setAlertVisible(false)}
                />
            )}
        </KeyboardAvoidingView>
    );
};
