import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useCreateCharacterMutation } from '../api/characterApi';
import { Gender, SocialClasses, Traits } from "../../common/types";
import { SerializedError } from "@reduxjs/toolkit";
import {Select} from "../../common/components/Select";

export const CreateCharacterScreen = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [traits, setTraits] = useState<string[]>([]);
    const [socialClass, setSocialClass] = useState('');
    const [backstory, setBackstory] = useState('');
    const [createCharacter, { isLoading, isError, error }] = useCreateCharacterMutation();

    const handleCreateCharacter = async () => {
        if (!name || !age || !gender || !socialClass) {
            console.error('Please fill in all required fields');
            return;
        }
        try {
            const result = await createCharacter({
                name,
                age: parseInt(age, 10),
                gender: gender as Gender,
                traits: traits as Traits[],
                socialClass: socialClass as SocialClasses,
                backstory,
            }).unwrap();
            console.log('Character created:', result);
        } catch (err) {
            console.error('Failed to create character:', err);
        }
    };

    // Данные для FlatList, чтобы рендерить весь контент
    const formData = [
        { key: 'name', component: (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            )},
        { key: 'age', component: (
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                />
            )},
        { key: 'gender', component: (
                <Select
                    items={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                        { label: 'Other', value: 'Other' },
                    ]}
                    label="Gender"
                    placeholder="Select Gender"
                    selectedValue={gender}
                    onValueChange={setGender}
                    error={gender === '' ? 'Gender is required' : undefined}
                />
            )},
        { key: 'socialClass', component: (
                <Select
                    items={[
                        { label: 'Peasant', value: 'Peasant' },
                        { label: 'Warrior', value: 'Warrior' },
                        { label: 'Healer', value: 'Healer' },
                        { label: 'Merchant', value: 'Merchant' },
                        { label: 'Guard', value: 'Guard' },
                        { label: 'Archer', value: 'Archer' },
                        { label: 'Mage', value: 'Mage' },
                        { label: 'Noble', value: 'Noble' },
                        { label: 'Lord', value: 'Lord' },
                        { label: 'Thief', value: 'Thief' },
                    ]}
                    label="Social Class"
                    placeholder="Select Social Class"
                    selectedValue={socialClass}
                    onValueChange={setSocialClass}
                    error={socialClass === '' ? 'Social Class is required' : undefined}
                />
            )},
        { key: 'traits', component: (
                <>
                    <Text style={styles.label}>Traits (select up to 3)</Text>
                    {[ 'Brave', 'Honest', 'Kind', 'Loyal', 'Wise', 'Charismatic', 'Resilient', 'Generous', 'Courageous', 'Compassionate',
                        'Curious', 'Independent', 'Ambitious', 'Reserved', 'Adventurous', 'Cautious', 'Observant', 'Determined', 'Diplomatic', 'Pragmatic',
                        'Arrogant', 'Selfish', 'Greedy', 'Impulsive', 'Stubborn', 'Jealous', 'Vindictive', 'Cowardly', 'Deceitful', 'Lazy'
                    ].map((trait) => (
                        <TouchableOpacity
                            key={trait}
                            onPress={() => {
                                if (traits.includes(trait)) {
                                    setTraits(traits.filter((t) => t !== trait));
                                } else if (traits.length < 3) {
                                    setTraits([...traits, trait]);
                                }
                            }}
                            style={[
                                styles.optionButton,
                                traits.includes(trait) ? styles.selectedOption : undefined,
                            ]}
                        >
                            <Text>{trait}</Text>
                        </TouchableOpacity>
                    ))}
                </>
            )},
        { key: 'backstory', component: (
                <TextInput
                    style={styles.input}
                    placeholder="Backstory (Max 500 characters)"
                    value={backstory}
                    onChangeText={(text) => setBackstory(text.slice(0, 500))}
                    multiline
                />
            )},
        { key: 'submit', component: (
                <TouchableOpacity onPress={handleCreateCharacter} style={styles.createButton} disabled={isLoading}>
                    <Text style={styles.buttonText}>Create Character</Text>
                </TouchableOpacity>
            )},
    ];

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <FlatList
                data={formData}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 20 }}>
                        {item.component}
                    </View>
                )}
                keyExtractor={(item) => item.key}
                contentContainerStyle={styles.container}
            />
            {isError && (
                <Text style={styles.errorText}>
                    Error: {
                    'data' in error && typeof error.data === 'object' && error.data !== null && 'message' in (error.data as Record<string, any>)
                        ? (error.data as Record<string, any>).message
                        : (error as SerializedError).message || 'An unexpected error occurred'
                }
                </Text>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        marginBottom: 10,
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: '#a0c1e0',
    },
    createButton: {
        padding: 15,
        backgroundColor: '#007bff',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
