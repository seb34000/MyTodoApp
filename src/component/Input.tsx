import React from 'react';

import { StyleSheet, TextInput, StyleProp, TextStyle } from 'react-native';

import { useTheme } from '@react-navigation/native';

interface InputProps {
    onChangeText: (text: string) => void;
    value: string;
    placeholder: string;
    style?: StyleProp<TextStyle>;
}

export const Input = (props: InputProps) => {
    const colors = useTheme()

    return (
        <TextInput
            style={[styles.input, {backgroundColor: colors.colors.background}, props.style]}
            onChangeText={props.onChangeText}
            value={props.value}
            placeholder={props.placeholder}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        // width: '90%',
        // height: '10%',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 0,
    },

});