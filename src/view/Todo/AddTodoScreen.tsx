import React, { useEffect } from 'react'
import { useTheme } from '@react-navigation/native'

import { View, Text, StyleSheet } from 'react-native'
import { Input } from '../../component/Input'
import { hexToRgba } from '../../utils/hexToRgba'

import DateTimePicker from '@react-native-community/datetimepicker'
import Slider from '@react-native-community/slider'
import { Button } from '../../component/Button'
import { AddIcon } from '../../icon/AddIcon'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../store/action'

export const AddTodoScreen = (props: any) => {
	const colors = useTheme()
	const dispatch = useDispatch()

	const [name, setName] = React.useState('')
	const [description, setDescription] = React.useState('')
	const [date, setDate] = React.useState(new Date())
	const [sliderValue, setSliderValue] = React.useState(0)

	useEffect(() => {
		console.log('AddTodoScreen')
		console.log(JSON.stringify(props.modalData, null, 2))
	}, [])

	return (
		<View style={styles.container}>
			<View style={[styles.box]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Title
				</Text>
				<Input
					value={name}
					onChangeText={setName}
					placeholder='Enter todo name'
					style={{
						color: colors.colors.text,
						width: '100%',
						backgroundColor: hexToRgba(
							colors.colors.background,
							0.8,
						),
					}}
				/>
			</View>
			<View style={[styles.box]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Description
				</Text>
				<Input
					value={description}
					onChangeText={setDescription}
					placeholder='Enter todo description'
					style={{
						color: colors.colors.text,
						width: '100%',
						backgroundColor: hexToRgba(
							colors.colors.background,
							0.8,
						),
					}}
				/>
			</View>
			<View style={[styles.box]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Date
				</Text>
				<DateTimePicker
					value={date}
					mode={'date'}
					display='default'
					onChange={(e, date) => setDate(date)}
					minimumDate={new Date()}
					style={{
						alignSelf: 'flex-start',
						marginTop: 5,
					}}
				/>
			</View>
			<View style={[styles.box]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Priority
				</Text>
				<Slider
					style={{ width: '100%', height: 40 }}
					minimumValue={0}
					maximumValue={10}
					minimumTrackTintColor='#FFFFFF'
					maximumTrackTintColor='#000000'
					onValueChange={(value) =>
						setSliderValue(parseInt(value.toFixed(0)))
					}
				/>
				<Text style={{ color: colors.colors.text }}>{sliderValue}</Text>
			</View>
			<Button
				label='Add'
				icon={AddIcon({
					color: colors.colors.text,
					size: 24,
					outline: true,
				})}
				onPress={() => {
					console.log('Add')
					if (name === '') {
						showMessage({
							message: 'Error',
							description: 'Please enter todo name',
							type: 'danger',
							icon: 'danger',
						})
						return
					} else if (description === '') {
						showMessage({
							message: 'Error',
							description: 'Please enter todo description',
							type: 'danger',
							icon: 'danger',
						})
						return
					} else if (date === null) {
						showMessage({
							message: 'Error',
							description: 'Please enter todo date',
							type: 'danger',
							icon: 'danger',
						})
						return
					} else if (sliderValue === 0) {
						showMessage({
							message: 'Error',
							description: 'Please enter todo priority',
							type: 'danger',
							icon: 'danger',
						})
						return
					}
					dispatch(
						addTodo(
							props.modalData.category.id,
							name,
							description,
							date,
							sliderValue,
						),
					)
				}}
				style={{
					width: '30%',
					backgroundColor: colors.colors.primary,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
	},

	box: {
		width: '100%',
		borderRadius: 15,
		padding: 10,
	},

	boxTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
})
