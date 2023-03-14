import React from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, View, Text, StyleSheet, Pressable, Keyboard, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ModalPickerProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

export const ModalPicker = (props: ModalPickerProps) => {
    const colors = useTheme()
    const keyboardOffset = React.useRef(new Animated.Value(0)).current;
    const startAnimation = (to) => { Animated.timing(keyboardOffset, {toValue: to, duration: 300, useNativeDriver: true}).start() }
    const [close, setClose] = React.useState<boolean>(true)

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardWillShow',(e) => {
                startAnimation(-e.endCoordinates.height);
            
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardWillHide',() => {
                startAnimation(0);
                console.log('keyboardWillHide')
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    React.useEffect(() => {
        console.log(props.isOpen)
        if (props.isOpen) {
            startAnimation(0)
            setClose(true)
        } else {
            startAnimation(200)
            setTimeout(() => {
                setClose(false)
            }, 300);
        }
    }, [props.isOpen])

    return (
        <Modal visible={props.isOpen ? props.isOpen : close} animationType='slide' transparent={true} onRequestClose={() => Keyboard.emit('keyboardWillHide')}>
            <Animated.View style={[styles.container, {
                backgroundColor: colors.colors.card, 
                transform: [
                    {
                        translateY: keyboardOffset
                    }
                ]
            }]}>
                <View style={[styles.header, {backgroundColor: colors.colors.primary}]}>
                    <Text style={[styles.title, {color: colors.colors.text}]}>{props.title}</Text>
                    <Pressable onPress={() => {
                        if (!keyboardOffset.hasListeners()) {
                            props.onClose()
                        }
                        }}>
                        <MaterialIcons name='close' size={24} color={colors.colors.text} />
                    </Pressable>
                </View>
                {props.children}
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        // height: '25%',
        width: '100%',
        // backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0
    },

    header: {
        // height: '16%',
        // backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 16,
        fontWeight: '600',
    }
});