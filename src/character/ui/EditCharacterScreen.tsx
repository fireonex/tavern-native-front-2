import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import tw from 'twrnc';
import {Alert} from "../../common/components/Alert";
import {useCharacterFormContext} from "../model/useCharacterContext";
import {CharacterForm} from "./CharacterForm";


export const EditCharacterScreen = () => {

    const {
        alertVisible,
        setAlertVisible,
        alertMessage,
        alertType,
    } = useCharacterFormContext()


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <CharacterForm operation={'Edit'}/>

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
