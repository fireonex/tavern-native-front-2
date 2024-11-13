import {Text, TouchableOpacity} from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
    onPress: any;
    disabled: boolean;
    text: string;
};
export const InlineButton = ({onPress, disabled, text}: Props) => {
    return (
        <TouchableOpacity style={tw`mt-5`}
                          onPress={onPress}
                          disabled={disabled}>
            <Text style={[tw`text-black text-xl`, {fontFamily: 'Regular'}]}>{text}</Text>
        </TouchableOpacity>
    );
};
