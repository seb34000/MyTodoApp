import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from '../component/Button';

export const CreateScreen = () => {
    const colors = useTheme()

    return (
        <View style={[styles.container, {backgroundColor: colors.colors.background}]}>
            <View style={[styles.header, {borderColor: colors.colors.border, backgroundColor: colors.colors.card}]}>
                <Button onPress={() => {}} label="Create" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        width: '90%',
        height: '10%',
        alignSelf: 'center',
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

