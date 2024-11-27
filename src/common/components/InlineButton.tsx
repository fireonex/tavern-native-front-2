import {Text, TouchableOpacity} from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
    onPress?: any;
    disabled?: boolean;
    text: string;
    style?: string;
    textSize?: string;
};
export const InlineButton = ({onPress, disabled, text, style, textSize = 'xl'}: Props) => {
    return (
        <TouchableOpacity style={tw`${style || ''} mt-5`}
                          onPress={onPress}
                          disabled={disabled}>
            <Text style={[tw`text-black text-${textSize}`, {fontFamily: 'Regular'}]}>{text}</Text>
        </TouchableOpacity>
    );
};
