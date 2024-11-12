import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Animated} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

type SelectProps = {
    items: { label: string; value: string }[];
    placeholder?: string;
    label?: string;
    error?: string;
    onValueChange: (value: string) => void;
    selectedValue?: string;
};

export const Select = ({
                           items,
                           placeholder = 'Select an option...',
                           label,
                           error,
                           onValueChange,
                           selectedValue,
                       }: SelectProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const dropdownHeight = new Animated.Value(0);

    const handlePress = () => {
        setIsFocused(!isFocused);
        Animated.timing(dropdownHeight, {
            toValue: isFocused ? 0 : 150,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                </Text>
            )}
            <TouchableOpacity
                style={[
                    styles.trigger,
                    isFocused ? styles.focusedTrigger : undefined,
                    error ? styles.errorTrigger : undefined,
                ]}
                onPress={handlePress}
            >
                <Text style={[styles.value, !selectedValue && styles.placeholder]}>
                    {selectedValue ? items.find(item => item.value === selectedValue)?.label : placeholder}
                </Text>
                <MaterialIcons name={isFocused ? "arrow-drop-up" : "arrow-drop-down"} size={24} color="#333"/>
            </TouchableOpacity>
            {isFocused && (
                <Animated.View style={[styles.dropdown, {height: dropdownHeight}]}>
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.value}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => {
                                    onValueChange(item.value);
                                    handlePress();
                                }}
                            >
                                <Text style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Animated.View>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

// Стили для Select компонента
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    focusedTrigger: {
        borderColor: '#007bff',
    },
    errorTrigger: {
        borderColor: 'red',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    placeholder: {
        color: '#999',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    item: {
        padding: 12,
    },
    itemText: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
    },
});
