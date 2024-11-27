import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useDeleteCharacterMutation, useGetCharactersQuery} from '../api/characterApi';
import tw from 'twrnc';
import {Character} from "../../common/types";
import {Typography} from "../../common/components/Typography";
import {Button} from "../../common/components/Button";
import {Alert} from "../../common/components/Alert";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {useNavigation} from "@react-navigation/native";
import {InlineButton} from "../../common/components/InlineButton";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export type CharacterListNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'CharacterList'>;

export const CharacterList = () => {
    const navigation = useNavigation<CharacterListNavigationProp>();

    const {data: characters, error, isLoading} = useGetCharactersQuery();
    const [deleteCharacter, {isLoading: isDeleting}] = useDeleteCharacterMutation();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [alertVisible, setAlertVisible] = useState(false);

    const userId = useSelector((state: RootState) => state.auth.userId);
    const username = useSelector((state: RootState) => state.auth.username);

    const handleDeleteCharacter = async (characterId: string) => {
        try {
            await deleteCharacter(characterId).unwrap();
            setSuccessMessage('Character deleted successfully');
            setAlertVisible(true);
        } catch (error) {
            setErrorMessage('Failed to delete character');
            setAlertVisible(true);
        }
    };

    if (isLoading || isDeleting) {
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

    const viewBoxStyle = tw`p-2 border border-gray-300 rounded flex flex-row gap-2`;

    return (
        <View style={tw`mx-5 mt-12 flex-1 justify-center items-center`}>
            <View style={tw`py-4 flex flex-row justify-between w-full`}>
                <View style={tw``}>
                    <InlineButton text={'←'} textSize={'3xl'} onPress={() => {
                        if (userId && username) {
                            navigation.navigate('UserPage', {
                                userId: userId,
                                username: username,
                            });
                        } else {
                            console.error('User information is missing. Please login again.');
                        }
                    }}/>
                </View>
                <View style={tw`fixed right-[10%]`}>
                    <Typography text={'Characters'} variant={'title'}/>
                </View>
            </View>
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
                        <Button
                            text={'Edit character'}
                            onPress={() => navigation.navigate('EditCharacter', {characterId: character._id})}
                            disabled={isDeleting}
                        />
                        <Button text={'Delete character'} onPress={() => handleDeleteCharacter(character._id)}
                                disabled={isDeleting}/>
                    </View>
                ))}
            </ScrollView>
            {(successMessage || errorMessage) && (
                <Alert
                    message={successMessage || errorMessage || ''}
                    type={successMessage ? 'success' : 'error'}
                    visible={alertVisible}
                    onDismiss={() => {
                        setAlertVisible(false);
                        setSuccessMessage(null);
                        setErrorMessage(null);
                    }}
                />
            )}
        </View>
    );
};
