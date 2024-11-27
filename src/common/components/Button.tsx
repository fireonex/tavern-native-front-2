import {Text, TouchableOpacity} from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
    onPress?: any;
    disabled?: boolean;
    text: string;
    style?: string;
};
export const Button = ({onPress, disabled, text, style}: Props) => {
    return (
        <TouchableOpacity style={tw`${style || ''} bg-black py-2.5 px-5 rounded-md items-center mt-5`}
                          onPress={onPress}
                          disabled={disabled}>
            <Text style={[tw`text-white text-lg`, {fontFamily: 'Regular'}]}>{text}</Text>
        </TouchableOpacity>
    );
};
