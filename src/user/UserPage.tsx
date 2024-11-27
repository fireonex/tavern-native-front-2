import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from "../../App";
import {Typography} from "../common/components/Typography";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import tw from "twrnc";
import {ImageButton} from "../common/components/ImageButton";

type UserPageProps = StackScreenProps<RootStackParamList, 'UserPage'>;

export type UserPageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserPage'>;

export const UserPage = ({route}: UserPageProps) => {
    const {userId, username} = route.params;

    const navigation = useNavigation<UserPageScreenNavigationProp>();
    const charactersPic = require("../../assets/images/characters.png");
    const createCharactersPic = require("../../assets/images/createCharacters.png");

    return (
        <View style={tw`flex-1 justify-center items-center mx-5 mt-12`}>
            <Typography text={'Profile'} variant={'title'}/>
            <View style={tw`mt-5`}>
                <Typography text={`Hello, ${username}! What do you want to do today?`} variant={'regularTitle'}/>
                <ImageButton image={createCharactersPic} onPress={() => navigation.navigate('CreateCharacter')}
                        text={'Create character'}/>
                <ImageButton image={charactersPic} text={'View characters'} onPress={() => navigation.navigate('CharacterList')}/>
                <ImageButton text={'Go to the tavern'}/>
            </View>
            {/*<CharacterList/>*/}
        </View>
    );
};
