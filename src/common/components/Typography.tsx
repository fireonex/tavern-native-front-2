import React from 'react'
import { Text } from 'react-native'
import tw from "twrnc"

type Props = {
    text: string,
    variant?: keyof typeof typographyVariants
}

const typographyVariants = {
    'title': [tw`text-center text-6xl text-black`, {fontFamily: 'FantasyH1'}],
    'error': [tw`text-center text-base text-red-500`, {fontFamily: 'Regular'}],
    'regularCenter': [tw`text-center text-base text-black mt-10`, {fontFamily: 'Regular'}],
    'regular': [tw`text-base text-black`, {fontFamily: 'Regular'}],
}

export function Typography({ text, variant = 'regular' }: Props) {
    return <Text style={typographyVariants[variant]}>{text}</Text>
}
