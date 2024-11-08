import {StyleSheet} from "react-native";

export const authStyles = StyleSheet.create({
    customButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Regular',
        fontSize: 18,
    },
    inlineButtonText: {
        color: 'black',
        fontFamily: 'Regular',
        fontSize: 20,
    },
    inputsContainer: {
        minWidth: 250,
        gap: 10,
    },
    container: {
        marginVertical: '40%',
        marginHorizontal: '8%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        borderRadius: 6,
        backgroundColor: '#fff',
        // Тень для iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.24,
        shadowRadius: 2.72,
        // Тень для Android
        elevation: 3,
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'FantasyH1',
        color: 'black',
    },
    input: {
        fontFamily: 'Regular',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    successText: {
        marginTop: 10,
        fontFamily: 'Regular',
        fontSize: 15,
        textAlign: "center"
    },
    errorText: {
        fontFamily: 'Regular',
        color: 'red',
        fontSize: 15,
        textAlign: "center"
    },
    smallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    }
});

//box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;