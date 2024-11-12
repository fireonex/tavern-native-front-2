import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from "../../App";
import {CreateCharacterScreen} from "../character/ui/CreateCharacterScreen";

type UserPageProps = StackScreenProps<RootStackParamList, 'UserPage'>;

export const UserPage = ({ route, navigation }: UserPageProps) => {
        const { userId, username } = route.params;

    return (
        <View style={[styles.container, {padding: 20}]}>
            <Text style={styles.title}>User Profile</Text>
            <Text>UserId: {userId}</Text>
            <Text>Username: {username}</Text>
            <View>
                <CreateCharacterScreen/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
