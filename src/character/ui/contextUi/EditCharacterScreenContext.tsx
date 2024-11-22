import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../../../App";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {CharacterFormProvider} from "../../model/useCharacterContext";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import {useGetCharactersQuery} from "../../api/characterApi";
import {Character} from "../../../common/types";
import {EditCharacterScreen} from "../EditCharacterScreen";

type EditCharacterProps = StackScreenProps<RootStackParamList, 'EditCharacter'>;

export type EditCharacterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditCharacter'>;

export const EditCharacterScreenContext = ({route}: EditCharacterProps) => {
    const navigation = useNavigation<EditCharacterScreenNavigationProp>();

    const {characterId} = route.params;

    const {data: characters} = useGetCharactersQuery();
    const character = characters?.find((c: Character) => c._id === characterId);
    const initialCharacter = character
        ? {...character, age: String(character.age), backstory: character.backstory || ''}
        : undefined;

    useEffect(() => {
        if (!character) {
            console.log('character not found')
            navigation.navigate('CharacterList');
        }
    }, [character, navigation]);

    return (
        <CharacterFormProvider operation={'update'} initialCharacter={initialCharacter}
                               characterId={characterId.toString()}>
            <EditCharacterScreen/>
        </CharacterFormProvider>
    );
};