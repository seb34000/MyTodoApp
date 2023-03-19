import React, { useEffect, useState } from 'react'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Keyboard,
	Animated,
} from 'react-native'
import { useTheme } from '@react-navigation/native'
import Modal from 'react-native-modal'
import { hexToRgba } from '../utils/hexToRgba'

interface ModalPickerProps {
	isOpen: boolean
	children: React.ReactNode
	onClose: () => void
	title: string
	onModalHide: () => void
	selectData: unknown
}

export const ModalPicker = (props: ModalPickerProps) => {
	const colors = useTheme()
	const keyboardOffset = React.useRef(new Animated.Value(0)).current
	const startAnimation = (to) => {
		Animated.timing(keyboardOffset, {
			toValue: to,
			duration: 1000,
			useNativeDriver: true,
		}).start()
	}
	const [open, setOpen] = useState<boolean>(false)

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardWillShow',
			(e) => {
				startAnimation(-e.endCoordinates.height)
			},
		)
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardWillHide',
			() => {
				startAnimation(0)
			},
		)

		return () => {
			keyboardDidHideListener.remove()
			keyboardDidShowListener.remove()
		}
	}, [])

	useEffect(() => {
		if (props.isOpen && open) {
			startAnimation(0)
			setOpen(true)
		} else if (props.isOpen && !open) {
			startAnimation(0)
			setOpen(true)
		} else if (!props.isOpen && open) {
			setOpen(false)
		} else if (!props.isOpen && !open) {
			setOpen(false)
		}
	}, [props.isOpen, open])

	useEffect(() => {
		if (props.selectData) {
			startAnimation(250)
			props.onClose()
		}
	}, [props.selectData])

	return (
		<Modal
			isVisible={open}
			style={{
				margin: 0,
			}}
			animationIn='slideInUp'
			animationOut='slideOutDown'
			animationInTiming={300}
			animationOutTiming={1000}
			onModalHide={() => {
				props.onModalHide()
			}}
			hideModalContentWhileAnimating={false}
			onModalWillHide={() => {
				startAnimation(250)
			}}
			onBackdropPress={() => {
				startAnimation(250)
				props.onClose()
			}}
			swipeDirection='down'
			onSwipeComplete={() => {
				startAnimation(250)
				props.onClose()
			}}
			propagateSwipe
		>
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: colors.colors.card,
						transform: [
							{
								translateY: keyboardOffset,
							},
						],
					},
				]}
			>
				<View
					style={[
						styles.header,
						{
							backgroundColor: hexToRgba(
								colors.colors.primary,
								0.5,
							),
						},
					]}
				>
					<Text style={[styles.title, { color: colors.colors.text }]}>
						{props.title}
					</Text>
					<Pressable
						onPress={() => {
							startAnimation(250)
							props.onClose()
						}}
					>
						<MaterialIcons
							name='close'
							size={24}
							color={colors.colors.text}
						/>
					</Pressable>
				</View>
				{props.children}
			</Animated.View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		borderBottomRightRadius: 9,
		borderBottomLeftRadius: 9,
		position: 'absolute',
		bottom: 0,
	},

	header: {
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
	},
})
