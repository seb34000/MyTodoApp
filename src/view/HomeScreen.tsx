import React from 'react';
import { View, Text, useColorScheme, StyleSheet, ScrollView, FlatList, TextInput, KeyboardAvoidingView, Keyboard, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { showMessage, hideMessage } from "react-native-flash-message";

import { ModalPicker } from '../component/ModalPicker';
import emojiJson from '../../assets/emoji.json'
import { Button } from '../component/Button';

interface EmojiType {
	emoji: string,
	description: string,
	category: string,
	aliases: string[],
	tags: string[],
	unicode_version: string,
	ios_version: string
}

export const HomeScreen = () => {
    const colors = useTheme()
    const [emojis, setEmojis] = React.useState<EmojiType[]>([])
    const [selectedEmoji, setSelectedEmoji] = React.useState<EmojiType>()
    const [search, setSearch] = React.useState<string>('')
    const [modalOpen, setModalOpen] = React.useState<boolean>(true)

    
    React.useEffect(() => {
        setEmojis(emojiJson)
    }, [])

    const searchEmoji = (text: string) => {
        const filtered = emojiJson.filter((emoji) => {
            if (emoji.emoji.includes(text)) {
                return emoji
            } else if (emoji.description.includes(text)) {
                return emoji
            } else if (emoji.category.includes(text)) {
                return emoji
            } else if (emoji.aliases.includes(text)) {
                return emoji
            } else if (emoji.tags.includes(text)) {
                return emoji
            }
        })
        if (filtered.length === 0)
            setEmojis(emojiJson)
        else
            setEmojis(filtered)
        setSearch(text)
    }

    const emojiChild = () => {
        return (
            <>
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    alignContent: 'center',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 5
                }}>
                    <TextInput onChangeText={searchEmoji} value={search} placeholder='Search' style={{
                        borderWidth: 1, 
                        borderColor: colors.colors.border, 
                        borderRadius: 10, 
                        padding: 10, 
                        width: '90%',
                        alignSelf: 'center',
                        color: colors.colors.text
                    }} />
                    <Pressable onPress={() => setSearch('')} style={({pressed}) => [
                        {opacity: pressed ? 0.5 : 1, borderRadius: 10}
                    ]}>
                        <Text style={{color: colors.colors.primary}}>Clear</Text>
                    </Pressable>
                </View>
                <FlatList 
                    data={emojis}
                    renderItem={({item, index}) => {
                        return (
                            <Pressable style={({pressed}) => [
                                {width: 70, alignItems: 'center', alignContent: 'center', margin: 5, opacity: pressed ? 0.5 : 1, padding: 7, marginBottom: 10}]
                            } onLongPress={() => {
                                showMessage({
                                    message: item.emoji,
                                    description: item.description + ' - ' + item.category,
                                    type: 'info',
                                    icon: 'info'
                                });
                            }} onPress={() => {
                                setSelectedEmoji(item)
                                setModalOpen(false)
                            }}>
                                <Text style={{fontSize: 50}}>{item.emoji}</Text>
                                <Text style={{fontSize: 10, color: colors.colors.text, textAlign: 'center'}}>{item.description}</Text>
                            </Pressable>
                        )
                    }}
                    horizontal={true}
                    keyExtractor={(item) => item.emoji}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, padding: 10}}>
                                <Text style={{color: colors.colors.text}}>No emoji found</Text>
                            </View>
                        )
                    }}
                />
            </>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.colors.background}]}>
        <KeyboardAvoidingView behavior='padding' style={[styles.container, {backgroundColor: colors.colors.background}]}>
            <View style={[styles.header, {borderColor: colors.colors.border}]}>
                <Text style={[{color: colors.colors.text}, styles.title]}>Create new todo catégorie</Text>
            </View>
            <View style={[styles.body, {borderColor: colors.colors.border}]}>
                <View style={styles.content}>
                    <Button onPress={() => {
                        setModalOpen(true)
                    }} label='Select Icon' />
                    <Text style={{fontSize: 50}}>{selectedEmoji?.emoji}</Text>
                </View>
                <ModalPicker isOpen={modalOpen} onClose={() => setModalOpen(false)} title='Choose icon'>
                    {emojiChild()}
                </ModalPicker>
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        // flex: 0.1,
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },

    body: {
        // flex: 0.9,
        height: '90%',
        borderWidth: 1,
    },

    content: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    text: {
        fontSize: 15,
        fontWeight: '500',
    },


});