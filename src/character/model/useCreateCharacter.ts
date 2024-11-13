import { useState } from 'react';
import { useCreateCharacterMutation } from '../api/characterApi';
import { Gender, SocialClasses, Traits, Race } from '../../common/types';

export const useCreateCharacter = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [socialClass, setSocialClass] = useState('');
    const [traits, setTraits] = useState<string[]>([]);
    const [race, setRace] = useState('');
    const [backstory, setBackstory] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [createCharacter, { isLoading, isError, error: apiError, isSuccess }] = useCreateCharacterMutation();

    // Видимость меню
    const [socialClassMenuVisible, setSocialClassMenuVisible] = useState(false);
    const [traitsMenuVisible, setTraitsMenuVisible] = useState(false);
    const [raceMenuVisible, setRaceMenuVisible] = useState(false);
    const [genderMenuVisible, setGenderMenuVisible] = useState(false);

    // Обработчик создания персонажа
    const handleCreateCharacter = async () => {
        // Сбрасываем ошибку в начале
        setError(null);

        // Проверяем валидность полей
        if (
            name.trim() === '' ||
            age.trim() === '' ||
            gender.trim() === '' ||
            socialClass.trim() === '' ||
            race.trim() === ''
        ) {
            setError('Please fill in all required fields');
            return;
        }

        const parsedAge = parseInt(age, 10);
        if (isNaN(parsedAge) || parsedAge <= 0) {
            setError('Age must be a valid positive number');
            return;
        }

        if (traits.length === 0) {
            setError('Please select at least one trait');
            return;
        }

        try {
            const result = await createCharacter({
                name: name.trim(),
                age: parsedAge,
                gender: gender as Gender,
                race: race as Race,
                traits: traits as Traits[],
                socialClass: socialClass as SocialClasses,
                backstory: backstory.trim(),
            }).unwrap();
            console.log('Character created:', result);
        } catch (err) {
            console.error('Failed to create character:', err);
        }
    };

    const handleNameChange = (value: string) => {
        setName(value);
        setError(null);
    };

    const handleAgeChange = (value: string) => {
        setAge(value);
        setError(null);
    };



    return {
        name,
        setName: handleNameChange,
        age,
        setAge: handleAgeChange,
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
        isLoading,
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
        handleCreateCharacter,
        error,
        isSuccess,
    };
};
