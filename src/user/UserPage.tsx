// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';
// import { RootStackParamList } from "../../App";
//
// type UserPageProps = StackScreenProps<RootStackParamList, 'UserPage'>;
//
// export const UserPage: React.FC<UserPageProps> = ({ route }) => {
//     const { userId, token } = route.params;
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>User Profile</Text>
//             <Text>UserId: {userId}</Text>
//             <Text>Token: {token}</Text>
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
// });
