import React, { useEffect } from 'react';
import { ScrollView, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import { useCreateCharacter } from '../model/useCreateCharacter';
import { GenderSelector } from "./charactersSelects/GenderSelector";
import { RaceSelector } from "./charactersSelects/RaceSelector";
import { TraitsSelector } from "./charactersSelects/TraitsSelector";
import { SocialClassSelector } from "./charactersSelects/SocialClassSelector";
import { Typography } from "../../common/components/Typography";
import { Button } from "../../common/components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Alert } from "../../common/components/Alert";

export type CreateCharacterScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'CreateCharacter'>;

export const CreateCharacterScreen = () => {
    const navigation = useNavigation<CreateCharacterScreenNavigationProp>();

    const userId = useSelector((state: RootState) => state.auth.userId);
    const username = useSelector((state: RootState) => state.auth.username);

    useEffect(() => {
        if (!userId || !username) {
            navigation.navigate('Login');
        }
    }, [userId, username, navigation]);

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
        isLoading,
        handleCreateCharacter,
        error,
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
    } = useCreateCharacter();

    const InputStyle = [tw`border border-gray-300 p-3 mb-5 rounded text-lg`, { fontFamily: 'Regular' }];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <ScrollView contentContainerStyle={tw`px-5 pb-5 pt-18`} keyboardShouldPersistTaps="handled">
                <View style={tw`mb-5`}>
                    <Typography text={`Create Your Character`} variant={'title2'} />
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
                                genderMenuVisible={genderMenuVisible} />
                <RaceSelector race={race} setRace={setRace} setRaceMenuVisible={setRaceMenuVisible}
                              raceMenuVisible={raceMenuVisible} />
                <SocialClassSelector setSocialClass={setSocialClass} socialClass={socialClass}
                                     socialClassMenuVisible={socialClassMenuVisible}
                                     setSocialClassMenuVisible={setSocialClassMenuVisible} />
                <TraitsSelector setTraits={setTraits} traits={traits} setTraitsMenuVisible={setTraitsMenuVisible}
                                traitsMenuVisible={traitsMenuVisible} />

                <TextInput
                    style={InputStyle}
                    placeholder="Backstory (Max 500 characters)"
                    value={backstory}
                    onChangeText={(text) => setBackstory(text.slice(0, 500))}
                    multiline
                />

                <Button onPress={handleCreateCharacter} text={'Create Character'} disabled={isLoading} />

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
