import tw from "twrnc";
import {Button, Menu} from "react-native-paper";
import {genders} from "../../data/charactersData";
import {View} from "react-native";
import React from "react";

type Props = {
    gender: string
    setGender: (gender: string) => void
    genderMenuVisible: boolean
    setGenderMenuVisible: (genderMenuVisible: boolean) => void
}

export const GenderSelector = ({gender, setGender, genderMenuVisible, setGenderMenuVisible}: Props) => {

    return (
        <View style={tw`mb-5`}>
            <Menu
                visible={genderMenuVisible}
                onDismiss={() => setGenderMenuVisible(false)}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={() => setGenderMenuVisible(true)}
                        style={tw`border border-gray-300 rounded`}
                        labelStyle={[tw`text-black text-xl`, {fontFamily: 'Regular'}]}
                    >
                        {gender || 'Select Gender'}
                    </Button>
                }
                contentStyle={tw`border border-gray-300 rounded-lg bg-white`}
            >
                {genders.map((g) => (
                    <Menu.Item
                        key={g}
                        onPress={() => {
                            setGender(g);
                            setGenderMenuVisible(false);
                        }}
                        title={g}
                        titleStyle={[tw`text-lg text-black`, {fontFamily: 'Regular'}]}
                    />
                ))}
            </Menu>
        </View>
    );
};
