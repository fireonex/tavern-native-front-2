import tw from "twrnc";
import {Button, Menu} from "react-native-paper";
import {socialClasses} from "../../data/charactersData";
import {View} from "react-native";
import React from "react";

type Props = {
    socialClass: string
    setSocialClass: (socialClass: string) => void
    socialClassMenuVisible: boolean
    setSocialClassMenuVisible: (socialClassMenuVisible: boolean) => void
}

export const SocialClassSelector = ({
                                        setSocialClass,
                                        socialClassMenuVisible,
                                        setSocialClassMenuVisible,
                                        socialClass
                                    }: Props) => {

    return (
        <View style={tw`mb-5`}>
            <Menu
                visible={socialClassMenuVisible}
                onDismiss={() => setSocialClassMenuVisible(false)}
                anchor={
                    <Button mode="outlined"
                            onPress={() => setSocialClassMenuVisible(true)}
                            style={tw`border border-gray-300 rounded-[4px]`}
                            labelStyle={[tw`text-black text-xl`, {fontFamily: 'Regular'}]}
                    >
                        {socialClass || 'Select Social Class'}
                    </Button>
                }
                contentStyle={tw`border border-gray-300 rounded-lg bg-white`}
            >
                {socialClasses.map((cls) => (
                    <Menu.Item
                        key={cls}
                        onPress={() => {
                            console.log('Selected Class: ', cls);
                            setSocialClass(cls);
                            setSocialClassMenuVisible(false);
                        }}
                        title={cls}
                        titleStyle={[tw`text-lg text-black`, {fontFamily: 'Regular'}]}
                    />
                ))}
            </Menu>
        </View>
    );
}