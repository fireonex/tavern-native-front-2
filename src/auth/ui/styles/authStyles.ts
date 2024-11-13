import {StyleSheet} from "react-native";

export const authStyles = StyleSheet.create({
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
    input: {
        fontFamily: 'Regular',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    smallContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    }
});

//box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;