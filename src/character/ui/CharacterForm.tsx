import tw from "twrnc";
import {ScrollView, TextInput, View} from "react-native";
import {Typography} from "../../common/components/Typography";
import {GenderSelector} from "./charactersSelects/GenderSelector";
import {RaceSelector} from "./charactersSelects/RaceSelector";
import {SocialClassSelector} from "./charactersSelects/SocialClassSelector";
import {TraitsSelector} from "./charactersSelects/TraitsSelector";
import {Button} from "../../common/components/Button";
import React from "react";
import {useCharacterFormContext} from "../model/useCharacterContext";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useNavigation} from "@react-navigation/native";
import {CreateCharacterScreenNavigationProp} from "./contextUi/CreateCharacterScreenContext";


type Props = {
    operation: 'Create' | 'Edit'
};
export const CharacterForm = ({operation}: Props) => {

    const {
        name,
        setName,
        age,
        setAge,
        handleCreateCharacter,
        backstory,
        setBackstory,
        isCreating,
        isUpdating
    } = useCharacterFormContext();

    const navigation = useNavigation<CreateCharacterScreenNavigationProp>();

    const userId = useSelector((state: RootState) => state.auth.userId);
    const username = useSelector((state: RootState) => state.auth.username);

    const InputStyle = [tw`border border-gray-300 p-3 mb-5 rounded text-lg`, {fontFamily: 'Regular'}];

    return (
        <ScrollView contentContainerStyle={tw`px-5 pb-5 pt-18`} keyboardShouldPersistTaps="handled">
            <View style={tw`mb-5`}>
                <Typography text={`${operation} Your Character`} variant={'title2'}/>
            </View>

            <TextInput
                style={InputStyle}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={InputStyle}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />

            <GenderSelector/>
            <RaceSelector/>
            <SocialClassSelector/>
            <TraitsSelector/>

            <TextInput
                style={InputStyle}
                placeholder="Backstory (Max 500 characters)"
                value={backstory}
                onChangeText={(text) => setBackstory(text.slice(0, 500))}
                multiline
            />

            <Button onPress={handleCreateCharacter} text={`${operation} Character`} disabled={isCreating || isUpdating}/>

            <Button onPress={() => {
                if (userId && username) {
                    navigation.navigate('UserPage', {
                        userId: userId,
                        username: username,
                    });
                } else {
                    console.error('User information is missing. Please login again.');
                }
            }} text={'Back to user page'}/>
        </ScrollView>
    );
};