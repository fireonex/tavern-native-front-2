import tw from "twrnc";
import {IconButton, Snackbar} from "react-native-paper";
import {Typography} from "./Typography";
import React from "react";

type Props = {
    message: string;
    type: 'info' | 'success' | 'error';
    visible: boolean;
    onDismiss: () => void;
}

export const Alert = ({message, type, visible, onDismiss}: Props) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={5000}
            style={
                tw`
                ${type === "success" ? 'bg-[#578C56]' : ''}
                ${type === "info" ? 'bg-black' : ''}
                ${type === "error" ? 'bg-[#A62B1F]' : ''}
                rounded
                `
            }
            action={{
                label: '',
                icon: () => (
                    <IconButton
                        icon="close"
                        iconColor="white"
                        style={tw`-mr-6`}
                        onPress={onDismiss}
                    />
                ),
            }}
        >
            <Typography text={message} variant={'regularWhite'}/>
        </Snackbar>
    );
};
