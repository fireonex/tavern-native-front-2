import tw from "twrnc";
import {Button, Menu} from "react-native-paper";
import {availableRaces} from "../../data/charactersData";
import {View} from "react-native";
import React from "react";

type Props = {
    race: string
    setRace: (race: string) => void
    raceMenuVisible: boolean
    setRaceMenuVisible: (raceMenuVisible: boolean) => void
}

export const RaceSelector = ({race, setRace, raceMenuVisible, setRaceMenuVisible}: Props) => {

    return (
        <View style={tw`mb-5`}>
            <Menu
                visible={raceMenuVisible}
                onDismiss={() => setRaceMenuVisible(false)}
                anchor={
                    <Button style={tw`border border-gray-300 rounded-[4px]`}
                            labelStyle={[tw`text-black text-xl`,
                                {fontFamily: 'Regular'}]}
                            mode="outlined"
                            onPress={() => setRaceMenuVisible(true)}>
                        {race || 'Select Race'}
                    </Button>
                }
                contentStyle={tw`border border-gray-300 rounded-lg bg-white`}
            >
                {availableRaces.map((r) => (
                    <Menu.Item
                        key={r}
                        onPress={() => {
                            console.log('Selected Race: ', r);
                            setRace(r);
                            setRaceMenuVisible(false);
                        }}
                        title={r}
                        titleStyle={[tw`text-lg text-black`, {fontFamily: 'Regular'}]}
                    />
                ))}
            </Menu>
        </View>
    );
}