import React from 'react';
import {ScrollView, TextInput, View, KeyboardAvoidingView, Platform} from 'react-native';
import tw from 'twrnc';
import {SerializedError} from '@reduxjs/toolkit';
import {useCreateCharacter} from '../model/useCreateCharacter';
import {GenderSelector} from "./charactersSelectors/GenderSelector";
import {RaceSelector} from "./charactersSelectors/RaceSelector";
import {TraitsSelector} from "./charactersSelectors/TraitsSelector";
import {SocialClassSelector} from "./charactersSelectors/SocialClassSelector";
import {Typography} from "../../common/components/Typography";
import {Button} from "../../common/components/Button";

export const CreateCharacterScreen = () => {
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
        isError,
        error,
        socialClassMenuVisible,
        setSocialClassMenuVisible,
        traitsMenuVisible,
        setTraitsMenuVisible,
        raceMenuVisible,
        setRaceMenuVisible,
        genderMenuVisible,
        setGenderMenuVisible,
        handleCreateCharacter,
    } = useCreateCharacter();

    const InputStyle = [tw`border border-gray-300 p-3 mb-5 rounded text-lg`, {fontFamily: 'Regular'}];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={tw`flex-1`}
        >
            <ScrollView contentContainerStyle={tw`px-5 pb-5 pt-15`} keyboardShouldPersistTaps="handled">
                <View style={tw`mb-5`}>
                    <Typography text={'Create Your Character'} variant={'title'}/>
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

                <GenderSelector gender={gender} setGender={setGender} setGenderMenuVisible={setGenderMenuVisible}
                                genderMenuVisible={genderMenuVisible}/>
                <RaceSelector race={race} setRace={setRace} raceMenuVisible={raceMenuVisible}
                              setRaceMenuVisible={setRaceMenuVisible}/>
                <SocialClassSelector setSocialClass={setSocialClass} socialClass={socialClass}
                                     socialClassMenuVisible={socialClassMenuVisible}
                                     setSocialClassMenuVisible={setSocialClassMenuVisible}/>
                <TraitsSelector setTraits={setTraits} setTraitsMenuVisible={setTraitsMenuVisible}
                                traitsMenuVisible={traitsMenuVisible} traits={traits}/>

                <TextInput
                    style={InputStyle}
                    placeholder="Backstory (Max 500 characters)"
                    value={backstory}
                    onChangeText={(text) => setBackstory(text.slice(0, 500).trim())}
                    multiline
                />

                <Button onPress={handleCreateCharacter} text={'Create Character'} disabled={isLoading}/>

                {isError && error && (
                    <Typography variant={'error'} text={
                        'data' in error && typeof error.data === 'object' && error.data !== null && 'message' in (error.data as Record<string, any>)
                            ? (error.data as Record<string, any>).message
                            : (error as SerializedError).message || 'An unexpected error occurred'
                    }/>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
