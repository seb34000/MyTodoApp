import React from 'react'
import Modal from 'react-native-modal'
import { useTheme } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import { hexToRgba } from '../utils/hexToRgba'

interface ModalAddTodoProps {
	isOpen: boolean
	children: React.ReactNode
	onClose: () => void
	title: string
}

export const ModalAddTodo = (props: ModalAddTodoProps) => {
	const { colors } = useTheme()
	return (
		<Modal
			isVisible={props.isOpen}
			onBackdropPress={props.onClose}
			onBackButtonPress={props.onClose}
			onSwipeComplete={props.onClose}
			swipeDirection={['down']}
			style={styles.container}
			avoidKeyboard={true}
		>
			<View style={[styles.modal, { backgroundColor: colors.card }]}>
				<View
					style={[
						styles.header,
						{
							borderBottomColor: hexToRgba(colors.text, 0.4),
						},
					]}
				>
					<View
						style={[
							styles.headerGrip,
							{ backgroundColor: colors.text },
						]}
					/>
					<Text style={[styles.headerTitle, { color: colors.text }]}>
						{props.title}
					</Text>
				</View>
				<View style={styles.body}>{props.children}</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		margin: 0,
	},

	modal: {
		height: '60%',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
	},

	header: {
		// flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomStartRadius: 20,
		borderBottomEndRadius: 20,
		height: '10%',
	},

	headerGrip: {
		width: 50,
		height: 5,
		borderRadius: 5,
	},

	headerTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	body: {
		margin: 20,
	},
})
