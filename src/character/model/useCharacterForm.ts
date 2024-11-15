import { useState } from 'react';
import {useCreateCharacterMutation, useUpdateCharacterMutation} from '../api/characterApi';
import { Gender, SocialClasses, Traits, Race } from '../../common/types';

type UseCharacterFormProps = {
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

export const useCharacterForm = ({
                                     initialCharacter,
                                     operation,
                                     characterId,
                                 }: UseCharacterFormProps) => {
    const [name, setName] = useState(initialCharacter?.name || '');
    const [age, setAge] = useState(initialCharacter?.age || '');
    const [gender, setGender] = useState(initialCharacter?.gender || '');
    const [socialClass, setSocialClass] = useState(initialCharacter?.socialClass || '');
    const [traits, setTraits] = useState<string[]>(initialCharacter?.traits || []);
    const [race, setRace] = useState(initialCharacter?.race || '');
    const [backstory, setBackstory] = useState(initialCharacter?.backstory || '');


    const [createCharacter, { isLoading: isCreating, isError, error: apiError, isSuccess }] = useCreateCharacterMutation();
    const [updateCharacter, { isLoading: isUpdating }] = useUpdateCharacterMutation();

    // Видимость меню
    const [socialClassMenuVisible, setSocialClassMenuVisible] = useState(false);
    const [traitsMenuVisible, setTraitsMenuVisible] = useState(false);
    const [raceMenuVisible, setRaceMenuVisible] = useState(false);
    const [genderMenuVisible, setGenderMenuVisible] = useState(false);

    // Состояния для уведомления
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'info' | 'success' | 'error'>('info');

    // Функция для создания персонажа
    const handleFormSubmit = async () => {

        if (
            name.trim() === '' ||
            age.trim() === '' ||
            gender.trim() === '' ||
            socialClass.trim() === '' ||
            race.trim() === ''
        ) {
            setAlertMessage('Please fill in all required fields');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge) || parsedAge <= 0) {
            setAlertMessage('Age must be a valid positive number');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        if (traits.length === 0) {
            setAlertMessage('Please select at least one trait');
            setAlertType('error');
            setAlertVisible(true);
            return;
        }

        try {
            if (operation === 'create') {
                const result = await createCharacter({
                    name: name.trim(),
                    age: parsedAge,
                    gender: gender as Gender,
                    race: race as Race,
                    traits: traits as Traits[],
                    socialClass: socialClass as SocialClasses,
                    backstory: backstory.trim(),
                }).unwrap();
                setAlertMessage('Character created successfully!');
            } else if (operation === 'update' && characterId) {
                await updateCharacter({
                    characterId,
                    characterData: {
                        name: name.trim(),
                        age: parsedAge,
                        gender,
                        socialClass,
                        race,
                        traits,
                        backstory: backstory.trim(),
                    },
                }).unwrap();
                setAlertMessage('Character updated successfully!');
            }
            setAlertType('success');
            setAlertVisible(true);
            resetFields();
        } catch (err) {
            console.error('Failed to create character:', err);
            setAlertMessage('Failed to create character');
            setAlertType('error');
            setAlertVisible(true);
        }
    };

    const resetFields = () => {
        setName('');
        setAge('');
        setGender('');
        setSocialClass('');
        setTraits([]);
        setRace('');
        setBackstory('');
    };

    return {
        name,
        setName,
        age,
        setAge,
        gender,
        setGender,
        socialClass,
        setSocialClass,
        traits,
        setTraits,
        race,
        setRace,
        backstory,
        setBackstory,
        isCreating,
        isUpdating,
        isError,
        apiError,
        socialClassMenuVisible,
        setSocialClassMenuVisible,
        traitsMenuVisible,
        setTraitsMenuVisible,
        raceMenuVisible,
        setRaceMenuVisible,
        genderMenuVisible,
        setGenderMenuVisible,
        handleCreateCharacter: handleFormSubmit,
        isSuccess,
        // Уведомления
        alertVisible,
        setAlertVisible,
        alertMessage,
        alertType,
        setAlertMessage,
    };
};
