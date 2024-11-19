import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, TextInput, View} from 'react-native';
import tw from 'twrnc';
import {useGetCharactersQuery} from '../api/characterApi';
import {GenderSelector} from "./charactersSelects/GenderSelector";
import {RaceSelector} from "./charactersSelects/RaceSelector";
import {TraitsSelector} from "./charactersSelects/TraitsSelector";
import {SocialClassSelector} from "./charactersSelects/SocialClassSelector";
import {Typography} from "../../common/components/Typography";
import {Button} from "../../common/components/Button";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {Alert} from "../../common/components/Alert";
import {Character} from '../../common/types';
import {StackScreenProps} from "@react-navigation/stack";
import {useCharacterForm} from "../model/useCharacterForm";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

type EditCharacterProps = StackScreenProps<RootStackParamList, 'EditCharacter'>;

export type EditCharacterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditCharacter'>;

export const EditCharacterScreen = ({route}: EditCharacterProps) => {
    const navigation = useNavigation<EditCharacterScreenNavigationProp>();
    const {characterId} = route.params;

    const {data: characters} = useGetCharactersQuery();
    const character = characters?.find((c: Character) => c._id === characterId);
    const initialCharacter = character
        ? { ...character, age: String(character.age), backstory: character.backstory || '' }
        : undefined;

    const userId = useSelector((state: RootState) => state.auth.userId);
    const username = useSelector((state: RootState) => state.auth.username);

    const {
        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        socialClass,
        setSocialClass,
        traits,
        setTraits,
        race,
        setRace,
        backstory,
        setBackstory,
        isCreating,
        isUpdating,
        socialClassMenuVisible,
        setSocialClassMenuVisible,
        traitsMenuVisible,
        setTraitsMenuVisible,
        raceMenuVisible,
        setRaceMenuVisible,
        genderMenuVisible,
        setGenderMenuVisible,
        alertVisible,
        setAlertVisible,
        alertMessage,
        alertType,
        setAlertMessage,
        setAlertType,
        handleUpdateCharacter
    } = useCharacterForm({
        operation: 'update', initialCharacter: initialCharacter, characterId: characterId.toString()
    });

    useEffect(() => {
        if (!character) {
            setAlertMessage('Character not found');
            setAlertType('error');
            setAlertVisible(true);
            navigation.navigate('CharacterList');
        }
    }, [character, navigation]);


    const InputStyle = [tw`border border-gray-300 p-3 mb-5 rounded text-lg`, {fontFamily: 'Regular'}];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <ScrollView contentContainerStyle={tw`px-5 pb-5 pt-18`} keyboardShouldPersistTaps="handled">
                <View style={tw`mb-5`}>
                    <Typography text={`Edit Your Character`} variant={'title2'}/>
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

                {/* Селекторы для создания персонажа */}
                <GenderSelector gender={gender} setGender={setGender} setGenderMenuVisible={setGenderMenuVisible}
                                genderMenuVisible={genderMenuVisible}/>
                <RaceSelector race={race} setRace={setRace} setRaceMenuVisible={setRaceMenuVisible}
                              raceMenuVisible={raceMenuVisible}/>
                <SocialClassSelector setSocialClass={setSocialClass} socialClass={socialClass}
                                     setSocialClassMenuVisible={setSocialClassMenuVisible}
                                     socialClassMenuVisible={socialClassMenuVisible}/>
                <TraitsSelector setTraits={setTraits} traits={traits} setTraitsMenuVisible={setTraitsMenuVisible}
                                traitsMenuVisible={traitsMenuVisible}/>

                <TextInput
                    style={InputStyle}
                    placeholder="Backstory (Max 500 characters)"
                    value={backstory}
                    onChangeText={(text) => setBackstory(text.slice(0, 500))}
                    multiline
                />

                <Button onPress={handleUpdateCharacter} text={'Update Character'} disabled={isCreating || isUpdating}/>

                <Button onPress={() => {
                    if (userId && username) {
                        navigation.navigate('UserPage', {
                            userId: userId,
                            username: username,
                        });
                    } else {
                        console.error('User information is missing. Please login again.');
                    }
                }} text={'Back to user page'} />
            </ScrollView>

            {alertVisible && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    visible={alertVisible}
                    onDismiss={() => setAlertVisible(false)}
                />
            )}
        </KeyboardAvoidingView>
    );
};
