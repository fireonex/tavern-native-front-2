import React, {useEffect} from 'react';
import {RootStackParamList} from "../../../App";
import {StackScreenProps} from "@react-navigation/stack";
import {Text, View} from "react-native";
import {Button} from "../../common/components/Button";
import tw from "twrnc";
import {Typography} from "../../common/components/Typography";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useTavernScreen} from "../model/useTavernScreen";

type TavernScreenProps = StackScreenProps<RootStackParamList, 'Tavern'>;
export type TavernScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tavern'>;
export const TavernScreen = ({route}: TavernScreenProps) => {

    const {
        handleExitTavern,
        userId,
        characterId,
        firstFetchDialogueHandler,
        nextFetchDialogueHandler,
        fetchDialogue,
        isLoading,
        error,
        dialogue,
        navigation
    } = useTavernScreen(route)

    useEffect(() => {
        return () => {
            handleExitTavern();
        };
    }, [userId, characterId]);

    useEffect(() => {
        firstFetchDialogueHandler()
    }, [userId, characterId, fetchDialogue]);

    const handleAction = (action: string) => {
        nextFetchDialogueHandler(action)
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={tw`my-30 mx-5`}>
            <Typography text={dialogue?.message || ''} variant={'regularTitle'}/>
            {dialogue?.options && (
                <View>
                    {dialogue.options.map((option, index) => (
                        <Button text={option.label} onPress={() => handleAction(option.action)}/>
                    ))}
                </View>
            )}
            <Button text={'End'} onPress={() => {
                handleExitTavern();
                navigation.navigate('CharacterList');
            }}/>
        </View>
    );
};
