import React, {useEffect, useState} from 'react';
import {DialogueResponse} from "../api/types";
import {useFetchDialogueMutation} from "../api/tavernDialogueApi";
import {RootStackParamList} from "../../../App";
import {StackScreenProps} from "@react-navigation/stack";
import {Text, View} from "react-native";
import {Button} from "../../common/components/Button";

type TavernScreenProps = StackScreenProps<RootStackParamList, 'Tavern'>;
export const TavernScreen = ({route}: TavernScreenProps) => {
    const {userId, characterId} = route.params;
    const [dialogue, setDialogue] = useState<DialogueResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [fetchDialogue, {data, error: apiError, isLoading}] = useFetchDialogueMutation();

    useEffect(() => {
        // Логируем запрос на начало диалога
        console.log('Requesting initial dialogue...');

        // Запрашиваем начальный диалог
        fetchDialogue({userId, characterId, action: 'entry'})
            .unwrap()
            .then((response) => {
                console.log('Initial dialogue response:', response);
                setDialogue(response);
                setError(null); // Если запрос успешен, сбрасываем ошибку
            })
            .catch((err) => {
                console.error('Error during initial dialogue fetch:', err);
                setError(err.message || 'Server error');
            });
    }, [userId, characterId, fetchDialogue]);

    const handleAction = (action: string) => {
        console.log('Sending action:', action); // Логирование действия

        fetchDialogue({userId, characterId, action})
            .unwrap()
            .then((response) => {
                console.log('Action response:', response); // Логируем ответ после выполнения действия
                setDialogue(response);
                setError(null);
            })
            .catch((err) => {
                console.error('Error performing action:', err);
                setError(err.message || 'Server error');
            });
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View>
            <Text>{dialogue?.message}</Text>
            {dialogue?.options && (
                <View>
                    {dialogue.options.map((option, index) => (
                        <Button text={option.label} onPress={() => handleAction(option.action)}/>
                    ))}
                </View>
            )}
        </View>
    );
};
