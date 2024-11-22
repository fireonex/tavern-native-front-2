import {CharacterFormProvider} from "../../model/useCharacterContext";
import {CreateCharacterScreen} from "../CreateCharacterScreen";
import {useNavigation} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useEffect} from "react";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../../App";

export type CreateCharacterScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList, 'CreateCharacter'>;

export const CreateCharacterScreenContext = () => {

    const navigation = useNavigation<CreateCharacterScreenNavigationProp>();

    const userId = useSelector((state: RootState) => state.auth.userId);
    const username = useSelector((state: RootState) => state.auth.username);

    useEffect(() => {
        if (!userId || !username) {
            navigation.navigate('Login');
        }
    }, [userId, username, navigation]);

    return (
        <CharacterFormProvider operation={'create'}>
            <CreateCharacterScreen/>
        </CharacterFormProvider>
    );
};