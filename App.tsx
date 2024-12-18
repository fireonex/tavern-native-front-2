import React, {useState} from 'react';
import {Provider} from "react-redux";

import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from "./src/auth/ui/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {RegistrationScreen} from "./src/auth/ui/RegistrationScreen";
import {store} from "./src/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {UserPage} from "./src/user/UserPage";
import {PaperProvider} from "react-native-paper";
import {CharacterList} from "./src/character/ui/CharacterList";
import {EditCharacterScreenContext} from "./src/character/ui/contextUi/EditCharacterScreenContext";
import {CreateCharacterScreenContext} from "./src/character/ui/contextUi/CreateCharacterScreenContext";
import {TavernScreen} from "./src/dialogue/ui/TavernScreen";
import {Character} from "./src/common/types";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    UserPage: { userId: string; username: string; };
    CreateCharacter: undefined;
    CharacterList: undefined
    EditCharacter: { characterId: string; }
    Tavern: { characterId: string, userId: string }
    Chatbot: { character: Character }
};

const Stack = createStackNavigator<RootStackParamList>();

async function loadApplication() {
    await Font.loadAsync({
        'FantasyH1': require('./assets/fonts/dragon-slayer.regular.ttf'),
        'FantasyRegular': require('./assets/fonts/morris-roman.black.ttf'),
        'SeparateText': require('./assets/fonts/Harpers.ttf'),
        'Regular': require('./assets/fonts/IMFellEnglish-Regular.ttf'),
    });
}

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                cardStyle: {backgroundColor: 'white'},
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegistrationScreen}/>
            <Stack.Screen name="CreateCharacter" component={CreateCharacterScreenContext}/>
            <Stack.Screen name="CharacterList" component={CharacterList}/>
            <Stack.Screen
                name="UserPage"
                component={UserPage}
            />
            <Stack.Screen
                name="EditCharacter"
                component={EditCharacterScreenContext}
            />
            <Stack.Screen
                name="Tavern"
                component={TavernScreen}
            />
            {/*<Stack.Screen*/}
            {/*    name="Chatbot"*/}
            {/*    component={ChatbotScreen}*/}
            {/*/>*/}
        </Stack.Navigator>
    );
}

export default function App() {
    const [isReady, setIsReady] = useState(false);

    if (!isReady) {
        return (
            <AppLoading
                startAsync={loadApplication}
                onError={err => console.log(err)}
                onFinish={() => setIsReady(true)}
            />
        )
    }
    return (
        <Provider store={store}>
            <NavigationContainer>
                <PaperProvider>
                        <RootStack/>
                </PaperProvider>
            </NavigationContainer>
        </Provider>
    );
}

