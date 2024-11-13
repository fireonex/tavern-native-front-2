import tw from "twrnc";
import {Button, Menu} from "react-native-paper";
import {availableTraits} from "../../data/charactersData";
import {View} from "react-native";
import React from "react";
import {useCreateCharacter} from "../../model/useCreateCharacter";
import {Traits} from "../../../common/types";

type Props = {
    traitsMenuVisible: boolean,
    setTraitsMenuVisible: (visible: boolean) => void,
    setTraits: (traits: string[]) => void,
    traits: string[]
}

export const TraitsSelector = ({traitsMenuVisible, setTraitsMenuVisible, traits, setTraits}: Props) => {

    return (
        <View style={tw`mb-5`}>
            <Menu
                visible={traitsMenuVisible}
                onDismiss={() => setTraitsMenuVisible(false)}
                anchor={
                    <Button mode="outlined"
                            onPress={() => setTraitsMenuVisible(true)}
                            style={tw`border border-gray-300 rounded-[4px]`}
                            labelStyle={[tw`text-black text-xl`, {fontFamily: 'Regular'}]}
                    >
                        {traits.length > 0 ? traits.join(', ') : 'Select Traits (up to 3)'}
                    </Button>
                }
                contentStyle={tw`border border-gray-300 rounded-lg bg-white`}
            >
                {availableTraits.map((trait) => (
                    <Menu.Item
                        key={trait}
                        onPress={() => {
                            if (traits.includes(trait)) {
                                setTraits(traits.filter((t) => t !== trait));
                            } else if (traits.length < 3) {
                                setTraits([...traits, trait]);
                            }
                        }}
                        title={trait}
                        titleStyle={[tw`text-lg text-black`, {fontFamily: 'Regular'}]}
                    />
                ))}
            </Menu>
        </View>
    );
}