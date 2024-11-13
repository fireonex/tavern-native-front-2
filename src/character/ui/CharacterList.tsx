import React, {useCallback} from 'react';
import {ScrollView, Text, View, ActivityIndicator} from 'react-native';
import {useGetCharactersQuery} from '../api/characterApi';
import tw from 'twrnc';
import {Character} from "../../common/types";
import {useFocusEffect} from "@react-navigation/native";
import {Typography} from "../../common/components/Typography";

export const CharacterList = () => {
    const {data: characters, error, isLoading, refetch} = useGetCharactersQuery();

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    if (error) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Typography variant={'error'} text={'Failed to load characters'}/>
            </View>
        );
    }

    if (!characters || characters.length === 0) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <Typography variant={'regular'} text={'You don\'t have any characters created yet'}/>
            </View>
        );
    }

    const viewBoxStyle = tw`p-2 border border-gray-300 rounded flex flex-row gap-2`

    return (
        <ScrollView contentContainerStyle={tw`px-5 pt-5`}>
            {characters.slice().reverse().map((character: Character) => (
                <View key={character._id} style={tw`mb-5 border rounded-lg border-gray-300 p-2 max-w-[340px]`}>
                    <View>
                        <Typography variant={'regularTitle'} text={character.name}/>
                    </View>
                    <View style={viewBoxStyle}>
                        <Typography variant={'regularBold'} text={'Age:'}/>
                        <Typography variant={'regular'} text={`${character.age}`}/>
                    </View>
                    <View style={viewBoxStyle}>
                        <Typography variant={'regularBold'} text={'Gender:'}/>
                        <Typography variant={'regular'} text={`${character.gender}`}/>
                    </View>
                    <View style={viewBoxStyle}>
                        <Typography variant={'regularBold'} text={'Race:'}/>
                        <Typography variant={'regular'} text={`${character.race}`}/>
                    </View>
                    <View style={viewBoxStyle}>
                        <Typography variant={'regularBold'} text={'Social Class:'}/>
                        <Typography variant={'regular'} text={`${character.socialClass}`}/>
                    </View>
                    <View style={viewBoxStyle}>
                        <Typography variant={'regularBold'} text={'Traits:'}/>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '90%'}}>
                            <Text numberOfLines={3}
                                  style={[tw`text-base text-black`, {fontFamily: 'Regular'}]}>{character.traits.join(', ')}</Text>
                        </View>
                    </View>
                    {character.backstory &&
                        <View style={tw`p-2 border border-gray-300 rounded mt-3`}>
                            <Typography variant={'regularBold'} text={'Backstory:'}/>
                            <Typography variant={'regular'} text={`${character.backstory}`}/>
                        </View>
                    }
                </View>
            ))}
        </ScrollView>
    );
};
