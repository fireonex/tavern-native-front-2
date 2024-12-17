import React, {useState} from 'react';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import tw from 'twrnc';
// import axios from 'axios';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../../App";

type ChatbotScreenProps = StackScreenProps<RootStackParamList, 'Chatbot'>;

export const ChatbotScreen = ({route}: ChatbotScreenProps) => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {character} = route.params;

    // Функция для отправки сообщений
    const sendMessage = async () => {
        // if (!userMessage.trim()) return; // Проверка, чтобы не отправлять пустое сообщение
        //
        // setIsLoading(true);
        // setError(null);
        //
        // try {
        //     // Отправка сообщения на сервер
        //     const response = await axios.post('http://192.168.0.109:5000/api/aiChat/continueConversation', {
        //         character,
        //         userMessage,
        //     });
        //
        //     // Получаем ответ от бота
        //     const botMessage = response.data.message;
        //
        //     // Если сервер не отправил сообщение или оно пустое
        //     if (!botMessage) {
        //         setError('The response from the bot is empty or invalid.');
        //         setIsLoading(false);
        //         return;
        //     }
        //
        //     // Обновляем историю чата
        //     setChatHistory((prevHistory) => [
        //         ...prevHistory,
        //         `User: ${userMessage}`,
        //         `Bot: ${botMessage}`,
        //     ]);
        //
        //     // Очищаем поле ввода
        //     setUserMessage('');
        // } catch (err) {
        //     setError('An error occurred while communicating with the bot.');
        //     console.error('Error:', err);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    // Завершить разговор
    const endConversation = async () => {
        // try {
        //     await axios.post('http://192.168.0.109:5000/api/aiChat/endConversation', {});
        //     setChatHistory([]); // Очистить историю чата при завершении
        // } catch (err) {
        //     console.error('Error ending conversation:', err);
        // }
    };

    return (
        <ScrollView style={tw`flex-1 mt-10 mx-4 p-4`}>
            <Text style={tw`text-2xl font-bold mb-4`}>Fantasy Tavern Chatbot</Text>

            {/* История чата */}
            <ScrollView style={tw`border border-gray-300 p-4 mb-4`} contentContainerStyle={tw`space-y-2`}>
                {chatHistory.map((message, index) => (
                    <Text key={index} style={tw`text-lg`}>{message}</Text>
                ))}
            </ScrollView>

            {/* Поле ввода */}
            <TextInput
                style={tw`border border-gray-300 p-2 mb-4 rounded`}
                value={userMessage}
                onChangeText={setUserMessage}
                placeholder="Your message..."
                editable={!isLoading}
            />

            {/* Кнопка отправки */}
            <Button
                title={isLoading ? 'Sending...' : 'Send Message'}
                onPress={sendMessage}
                disabled={isLoading}
            />

            {/* Кнопка завершения разговора */}
            <Button
                title="End Conversation"
                onPress={endConversation}
            />

            {/* Сообщение об ошибке */}
            {error && <Text style={tw`text-red-500 mt-4`}>{error}</Text>}
        </ScrollView>
    );
};
