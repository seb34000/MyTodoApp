import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	Pressable,
} from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'
import { useSelector, useDispatch } from 'react-redux'

import { ModalPicker } from '../component/ModalPicker'
import emojiJson from '../../assets/emoji.json'
import colorJson from '../../assets/color.json'
import { Button } from '../component/Button'
import { EmojiType } from '../types/EmojiType'
import { Input } from '../component/Input'
import { ColorType } from '../types/ColorType'

import { Category } from '../redux/categorySlice'
import { addCategory } from '../redux/categorySlice'

export const CreateScreen = () => {
	const colors = useTheme()

	const navigation = useNavigation()

	const dispatch = useDispatch()
	const categories = useSelector(
		(state: { categories: Category[] }) => state.categories,
	)

	const [emojisList, setEmojisList] = React.useState<EmojiType[]>([])
	const [selectedEmoji, setSelectedEmoji] = React.useState<EmojiType>()

	const [colorsList, setColorsList] = React.useState<ColorType[]>([])
	const [selectedColor, setSelectedColor] = React.useState<ColorType>()

	const [name, setName] = React.useState<string>('')

	const [search, setSearch] = React.useState<string>('')

	const [modalOpen, setModalOpen] = React.useState<boolean>(false)
	const [modalOpenFor, setModalOpenFor] = React.useState<string>('')
	const [selection, setSelection] = React.useState<EmojiType | ColorType>(
		null,
	)

	React.useEffect(() => {
		setEmojisList(emojiJson)
		setColorsList(colorJson)
	}, [])

	const searchEmoji = (text: string) => {
		const filtered = emojiJson.filter((emoji) => {
			if (emoji.char.includes(text)) {
				return emoji
			} else if (emoji.name.includes(text)) {
				return emoji
			} else if (emoji.category.includes(text)) {
				return emoji
			} else if (emoji.codes.includes(text)) {
				return emoji
			} else if (emoji.group.includes(text)) {
				return emoji
			} else if (emoji.subgroup.includes(text)) {
				return emoji
			}
		})
		if (filtered.length === 0) setEmojisList(emojiJson)
		else setEmojisList(filtered)
		setSearch(text)
	}

	const searchColor = (text: string) => {
		const filtered = colorJson.filter((color) => {
			if (color.name.includes(text)) {
				return color
			} else if (color.hex.includes(text)) {
				return color
			}
		})
		if (filtered.length === 0) setColorsList(colorJson)
		else setColorsList(filtered)
		setSearch(text)
	}

	const childHeader = (searchFunc: (text: string) => void) => {
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					alignContent: 'center',
					width: '90%',
					alignSelf: 'center',
					marginTop: 5,
				}}>
				<Input
					onChangeText={(text) => searchFunc(text)}
					value={search}
					placeholder='Search'
					style={{ width: '85%' }}
				/>
				<Pressable
					onPress={() => setSearch('')}
					style={({ pressed }) => [
						{
							opacity: pressed ? 0.5 : 1,
							borderRadius: 10,
							margin: 5,
							padding: 10,
							backgroundColor: colors.colors.border,
						},
					]}>
					<Text style={{ color: colors.colors.primary }}>Clear</Text>
				</Pressable>
			</View>
		)
	}

	const emojiChild = () => {
		if (modalOpenFor !== 'emoji') {
			return <></>
		}
		return (
			<>
				{childHeader(searchEmoji)}
				<FlatList
					data={emojisList}
					renderItem={({ item }) => {
						return (
							<Pressable
								style={({ pressed }) => [
									{
										width: 70,
										alignItems: 'center',
										alignContent: 'center',
										margin: 5,
										opacity: pressed ? 0.5 : 1,
										padding: 7,
										marginBottom: 10,
									},
								]}
								onLongPress={() => {
									showMessage({
										message: item.char,
										description:
											item.codes + ' - ' + item.category,
										type: 'info',
										icon: 'info',
									})
								}}
								onPress={() => {
									setSelectedEmoji(item)
									// setModalOpen(false)
									setSelection(item)
								}}>
								<Text style={{ fontSize: 50 }}>
									{item.char}
								</Text>
								<Text
									style={{
										fontSize: 10,
										color: colors.colors.text,
										textAlign: 'center',
									}}>
									{item.name}
								</Text>
							</Pressable>
						)
					}}
					horizontal={true}
					keyExtractor={(item) => item.char}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => {
						return (
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									padding: 10,
								}}>
								<Text style={{ color: colors.colors.text }}>
									No emoji found
								</Text>
							</View>
						)
					}}
				/>
			</>
		)
	}

	const colorChild = () => {
		if (modalOpenFor !== 'color') {
			return <></>
		}
		return (
			<>
				{childHeader(searchColor)}
				<FlatList
					data={colorsList}
					renderItem={({ item }) => {
						return (
							<Pressable
								style={({ pressed }) => [
									{
										width: 70,
										alignItems: 'center',
										alignContent: 'center',
										margin: 5,
										opacity: pressed ? 0.5 : 1,
										padding: 7,
										marginBottom: 10,
									},
								]}
								onPress={() => {
									setSelectedColor(item)
									// setModalOpen(false)
									setSelection(item)
								}}>
								<View
									style={{
										width: 50,
										height: 50,
										borderRadius: 25,
										backgroundColor: item.hex,
									}}
								/>
								<Text
									style={{
										fontSize: 10,
										color: colors.colors.text,
										textAlign: 'center',
									}}>
									{item.name}
								</Text>
							</Pressable>
						)
					}}
					horizontal={true}
					keyExtractor={(item) => item.hex}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => {
						return (
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									padding: 10,
								}}>
								<Text style={{ color: colors.colors.text }}>
									No color found
								</Text>
							</View>
						)
					}}
				/>
			</>
		)
	}

	const handleAddCategory = () => {
		if (name === '') {
			showMessage({
				message: 'Name is required',
				type: 'danger',
				icon: 'danger',
			})
			return
		} else if (selectedEmoji.char === '') {
			showMessage({
				message: 'Emoji is required',
				type: 'danger',
				icon: 'danger',
			})
			return
		} else if (selectedColor.hex === '') {
			showMessage({
				message: 'Color is required',
				type: 'danger',
				icon: 'danger',
			})
			return
		}
		if (
			navigation
				.getState()
				.routeNames.find(
					(e) => e === name || e === 'Home' || e === 'Create',
				)
		) {
			showMessage({
				message: 'Name already exists',
				type: 'danger',
				icon: 'danger',
			})
			return
		}
		const newCategory = {
			id: categories.length + 1 || 1,
			name: name,
			emoji: selectedEmoji.char,
			color: selectedColor.hex,
		}
		dispatch(addCategory(newCategory))
		setName('')
		setSelectedEmoji(null)
		setSelectedColor(null)
	}

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.colors.background },
			]}>
			<KeyboardAvoidingView
				behavior='padding'
				style={[
					styles.container,
					{ backgroundColor: colors.colors.background },
				]}>
				<View
					style={[
						styles.header,
						{ borderColor: colors.colors.border },
					]}>
					<Text style={[{ color: colors.colors.text }, styles.title]}>
						Create new todo catégorie
					</Text>
				</View>
				<View
					style={[
						styles.body,
						{ borderColor: colors.colors.border },
					]}>
					<View
						style={[
							styles.content,
							{
								backgroundColor: colors.colors.card,
								borderColor: colors.colors.border,
							},
						]}>
						<Button
							onPress={() => {
								setModalOpen(true)
								setModalOpenFor('emoji')
							}}
							label='Select Icon'
						/>
						<Text style={{ fontSize: 50 }}>
							{selectedEmoji?.char}
						</Text>
					</View>
					<View
						style={[
							styles.content,
							{
								backgroundColor: colors.colors.card,
								borderColor: colors.colors.border,
							},
						]}>
						<Button
							onPress={() => {
								setModalOpen(true)
								setModalOpenFor('color')
							}}
							label='Select Color'
						/>
						<View
							style={{
								width: 50,
								height: 50,
								borderRadius: 25,
								backgroundColor: selectedColor?.hex,
							}}
						/>
					</View>
					<View
						style={[
							styles.content,
							{
								backgroundColor: colors.colors.card,
								borderColor: colors.colors.border,
							},
						]}>
						<TextInput
							style={[
								{
									color: colors.colors.text,
									backgroundColor: colors.colors.card,
									borderColor: colors.colors.border,
								},
								styles.input,
							]}
							placeholder='Catégorie name'
							placeholderTextColor={colors.colors.text}
							onChangeText={(text) => setName(text)}
							value={name}
						/>
					</View>
					<Button
						onPress={() => {
							handleAddCategory()
						}}
						label='Create'
					/>
					<ModalPicker
						isOpen={modalOpen}
						onClose={() => setModalOpen(false)}
						onModalHide={() => {
							setModalOpenFor('')
							setSearch('')
							setSelection(null)
						}}
						selectData={selection}
						title='Choose icon'>
						{emojiChild()}
						{colorChild()}
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
		// borderWidth: 1,
	},

	body: {
		// flex: 0.9,
		height: '90%',
		width: '100%',
		// borderWidth: 1,
	},

	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignContent: 'center',
		padding: 10,
		margin: 10,
		borderRadius: 10,
		borderWidth: 1,
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	text: {
		fontSize: 15,
		fontWeight: '500',
	},

	input: {
		// height: 40,
		// margin: 12,
		// borderWidth: 1,
		// borderRadius: 10,
		// padding: 10,
	},
})
