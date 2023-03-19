import React from 'react'

import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { hexToRgba } from '../utils/hexToRgba'

interface ButtonProps {
	onPress: () => void
	label: string
	icon?: React.ReactNode
	style?: any
}

export const Button = (props: ButtonProps) => {
	const colors = useTheme()

	return (
		<TouchableOpacity
			style={[
				styles.button,
				props.style,
				{ backgroundColor: hexToRgba(colors.colors.primary, 0.6) },
			]}
			onPress={props.onPress}
		>
			{props.icon}
			<Text
				style={{
					color: colors.colors.text,
				}}
			>
				{props.label}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	button: {
		// width: '90%',
		// height: '10%',
		alignSelf: 'center',
		margin: 5,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
})
