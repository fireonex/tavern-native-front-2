import {useState} from "react";
import {DialogueResponse} from "../api/types";
import {useNavigation} from "@react-navigation/native";
import {useEndDialogueMutation, useFetchDialogueMutation} from "../api/tavernDialogueApi";
import {TavernScreenNavigationProp} from "../ui/TavernScreen";

export const useTavernScreen = (route: { params: { characterId: string, userId: string } }) => {
    const {userId, characterId} = route.params;
    const [dialogue, setDialogue] = useState<DialogueResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<TavernScreenNavigationProp>();

    const [fetchDialogue, {data, error: apiError, isLoading}] = useFetchDialogueMutation();
    const [endDialogue] = useEndDialogueMutation();

    const firstFetchDialogueHandler = async () => {
        await fetchDialogue({userId, characterId, action: 'entry'})
            .unwrap()
            .then((response) => {
                setDialogue(response);
                setError(null);
            })
            .catch((err) => {
                setError(err.message || 'Server error');
            });
    }

    const nextFetchDialogueHandler = async (action: string) => {
        await fetchDialogue({userId, characterId, action})
            .unwrap()
            .then((response) => {
                setDialogue(response);
                setError(null);
            })
            .catch((err) => {
                setError(err.message || 'Server error');
            });
    }

    const handleExitTavern = async () => {
        try {
            await endDialogue({userId, characterId}).unwrap();
        } catch (error) {
            console.error('Ошибка при завершении диалога', error);
        }
    };
    return {
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
    }
}