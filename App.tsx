import React, {useState} from 'react';
import {Provider} from "react-redux";

import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from "./src/auth/ui/LoginScreen";
import {NavigationContainer} from "@react-navigation/native";
import {RegistrationScreen} from "./src/auth/ui/RegistrationScreen";
import {store} from "./src/store";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {UserPage} from "./src/user/UserPage";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    UserPage: { userId: string; username: string;};
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
                cardStyle: { backgroundColor: 'white' },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen
                name="UserPage"
                component={UserPage}
            />
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
                <RootStack/>
            </NavigationContainer>
        </Provider>
    );
}

