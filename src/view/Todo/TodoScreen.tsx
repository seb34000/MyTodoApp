import React, { useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { removeTodoCategory } from '../../store/action'
import { View, Text } from 'react-native'

export const TodoScreen = (props: any) => {
	const colors = useTheme()
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('TodoScreen')
		console.log(JSON.stringify(props, null, 2))
	}, [props])

	const onPress = () => {
		console.log('onPress')
		dispatch(removeTodoCategory(0))
	}

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors.colors.background,
			}}
		>
			<Text
				style={{
					color: colors.colors.text,
				}}
			>
				TodoScreen
			</Text>
		</View>
	)
}
