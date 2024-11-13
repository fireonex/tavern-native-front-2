import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from "../../App";
import {Typography} from "../common/components/Typography";
import {Button} from "../common/components/Button";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {CharacterList} from "../character/ui/CharacterList";

type UserPageProps = StackScreenProps<RootStackParamList, 'UserPage'>;

export type UserPageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserPage'>;

export const UserPage = ({route}: UserPageProps) => {
    const {userId, username} = route.params;

    const navigation = useNavigation<UserPageScreenNavigationProp>();

    return (
        <View style={[styles.container]}>
            <Typography text={'Profile'} variant={'title2'}/>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 50
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
