import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from "../../App";
import {Typography} from "../common/components/Typography";
import {Button} from "../common/components/Button";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {CharacterList} from "../character/ui/CharacterList";
import tw from "twrnc";

type UserPageProps = StackScreenProps<RootStackParamList, 'UserPage'>;

export type UserPageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserPage'>;

export const UserPage = ({route}: UserPageProps) => {
    const {userId, username} = route.params;

    const navigation = useNavigation<UserPageScreenNavigationProp>();

    return (
        <View style={tw`flex-1 justify-center items-center mx-5 mt-12`}>
            <Typography text={'Profile'} variant={'title'}/>
            {/*<Text>UserId: {userId}</Text>*/}
            {/*<Text>Username: {username}</Text>*/}
            <View>
                <Button onPress={() => navigation.navigate('CreateCharacter')}
                        text={'Create Character'}/>
            </View>
            <CharacterList/>
        </View>
    );
};
