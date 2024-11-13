import React from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useGetCharactersQuery } from '../api/characterApi';
import tw from 'twrnc';
import {Character} from "../../common/types";

export const CharacterList = () => {
    const { data: characters, error, isLoading } = useGetCharactersQuery();

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-red-500 text-lg`}>Failed to load characters.</Text>
            </View>
        );
    }

    if (!characters || characters.length === 0) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Text style={tw`text-black text-lg`}>No characters found.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={tw`px-5 pt-5`}>
            {characters.map((character: Character) => (
                <View key={character._id} style={tw`mb-5 p-4 border rounded-lg border-gray-300`}>
                    <Text style={tw`text-lg font-bold`}>{character.name}</Text>
                    <Text>Age: {character.age}</Text>
                    <Text>Gender: {character.gender}</Text>
                    <Text>Race: {character.race}</Text>
                    <Text>Social Class: {character.socialClass}</Text>
                    <Text>Traits: {character.traits.join(', ')}</Text>
                    <Text>Backstory: {character.backstory}</Text>
                </View>
            ))}
        </ScrollView>
    );
};
