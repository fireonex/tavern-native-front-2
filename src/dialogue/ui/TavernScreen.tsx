import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../../App";
type TavernScreenProps = StackScreenProps<RootStackParamList, 'Tavern'>;

export const TavernScreen = ({route}: TavernScreenProps) => {
    const {userId, characterId} = route.params;
    const [dialogue, setDialogue] = useState<string | null>(null);
    const [options, setOptions] = useState<{ action: string; label: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDialogue = async (action: string | null = null) => {
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.0.109:5000/api/dialogue/continue', {
                userId,
                characterId,
                action,
            });

            setDialogue(response.data.message);
            setOptions(response.data.options);
        } catch (err) {
            console.error('Failed to fetch dialogue:', err);
        } finally {
            setLoading(false);
        }
    };

    // Инициируем диалог, когда компонент впервые монтируется
    React.useEffect(() => {
        fetchDialogue();
    }, []);

    if (loading) {
        return <Text>Загрузка...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={tw`p-5`}>
            <View style={tw`mb-5`}>
                {dialogue && <Text style={tw`text-lg mb-4`}>{dialogue}</Text>}

                {options.map((option, index) => (
                    <Button
                        key={index}
                        title={option.label}
                        onPress={() => fetchDialogue(option.action)}
                    />
                ))}
            </View>
        </ScrollView>
    );
};
