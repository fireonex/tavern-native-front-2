import { Text, TouchableOpacity, ImageBackground, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {
    onPress?: () => void;
    disabled?: boolean;
    text: string;
    style?: string;
    image?: any;
};

export const ImageButton = ({ onPress, disabled, text, style, image }: Props) => {
    return (
        <TouchableOpacity
            style={[tw`${style || ""} rounded-md mt-5`, { overflow: "hidden" }]}
            onPress={onPress}
            disabled={disabled}
        >
            <ImageBackground
                source={image || require("../../../assets/images/tavern-horizontal.png")}
                style={tw`py-2.5 px-5 justify-center items-center`}
                imageStyle={tw`rounded-md`}
            >
                {/* Слой затемнения */}
                <View
                    style={[
                        tw`absolute inset-0 bg-black opacity-50`,
                        { borderRadius: 10 },
                    ]}
                />
                <Text style={[tw`text-white text-2xl`, { fontFamily: "Regular" }]}>
                    {text}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};
