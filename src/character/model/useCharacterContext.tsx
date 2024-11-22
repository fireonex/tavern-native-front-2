import React, {createContext, useContext, ReactNode} from 'react';
import {useCharacterForm as useCharacterFormHook} from './useCharacterForm';
import {Gender, Race, SocialClasses, Traits} from "../../common/types";

type CharacterFormContextType = ReturnType<typeof useCharacterFormHook>;

const CharacterFormContext = createContext<CharacterFormContextType | undefined>(undefined);

type CharacterFormProviderProps = {
    children: ReactNode;
    initialCharacter?: {
        name: string;
        age: string;
        gender: Gender;
        socialClass: SocialClasses;
        traits: Traits[];
        race: Race;
        backstory: string;
    };
    operation: 'create' | 'update';
    characterId?: string;
};

export const CharacterFormProvider = ({
                                          children,
                                          initialCharacter,
                                          operation,
                                          characterId,
                                      }: CharacterFormProviderProps) => {
    const characterForm = useCharacterFormHook({initialCharacter, operation, characterId});

    return (
        <CharacterFormContext.Provider value={characterForm}>
            {children}
        </CharacterFormContext.Provider>
    );
};

export const useCharacterFormContext = () => {
    const context = useContext(CharacterFormContext);
    if (!context) {
        throw new Error(
            'useCharacterForm must be used within a CharacterFormProvider'
        );
    }
    return context;
};
