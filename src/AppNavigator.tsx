import 'react-native-gesture-handler'

import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
	NavigationContainer,
	// DefaultTheme,
	// DarkTheme,
} from '@react-navigation/native'
import { useColorScheme, TouchableOpacity, Text } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { useDispatch } from 'react-redux'

import HomeScreen from './view/Home/HomeScreen'
import { HomeIcon } from './icon/HomeIcon'
import { connect } from 'react-redux'
import { CategoryType } from './types/Category'
import { CreateScreen } from './view/CreateScreen'
import { CreateIcon } from './icon/CreateIcon'
import { AddIcon } from './icon/AddIcon'
import { TodoScreen } from './view/Todo/TodoScreen'
import { ModalAddTodo } from './component/ModalAddTodo'
import { AddTodoScreen } from './view/Todo/AddTodoScreen'
import { darkTheme, lightTheme } from './utils/theme'

const Drawer = createDrawerNavigator()

interface Props {
	categories: CategoryType[]
}

function AppNavigator(props: Props) {
	const scheme = useColorScheme()
	const dispatch = useDispatch()

	const [modalData, setModalData] = React.useState(null)

	React.useEffect(() => {
		console.log('AppNavigator')
		// console.log(props.categories)
		props.categories.forEach((item, idx) => {
			if (Object.keys(item).length === 0) props.categories.splice(idx, 1)
		})
	}, [])

	return (
		<NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
			<Drawer.Navigator
				initialRouteName='Home'
				screenOptions={(propsItem) => ({
					drawerType: 'back',
					headerRight: (item) => {
						if (
							propsItem.route.name === 'Home' ||
							propsItem.route.name === 'Create'
						) {
							return null
						}
						return (
							<TouchableOpacity
								style={{
									alignItems: 'center',
									justifyContent: 'center',
									marginRight: 10,
								}}
								onPress={() => {
									setModalData(propsItem.route.params)
								}}
							>
								<AddIcon
									color={
										scheme === 'dark'
											? darkTheme.colors.primary
											: lightTheme.colors.primary
									}
									size={30}
									outline
								/>
							</TouchableOpacity>
						)
					},
				})}
			>
				<Drawer.Screen
					name='Home'
					component={HomeScreen}
					options={{
						drawerIcon: (item) => (
							<HomeIcon
								color={item.color}
								size={item.size}
								outline={item.focused}
							/>
						),
						drawerItemStyle: {
							borderTopWidth: 0.5,
							borderTopColor:
								scheme === 'dark'
									? darkTheme.colors.border
									: lightTheme.colors.border,
						},
					}}
				/>
				<Drawer.Screen
					name='Create'
					component={CreateScreen}
					options={{
						drawerIcon: (item) => (
							<CreateIcon
								color={item.color}
								size={item.size}
								outline={item.focused}
							/>
						),
						drawerItemStyle: {
							borderBottomWidth: 0.5,
							borderBottomColor:
								scheme === 'dark'
									? darkTheme.colors.border
									: lightTheme.colors.border,
						},
					}}
				/>
				{props.categories.length > 0 &&
					props.categories.map(
						(item) =>
							item && (
								<Drawer.Screen
									key={item.id}
									name={item.title}
									initialParams={{ category: item }}
									component={TodoScreen}
									options={{
										headerTitle: () => (
											<Text
												style={{
													fontSize: 20,
													fontWeight: 'bold',
													color:
														scheme === 'dark'
															? 'white'
															: 'black',
												}}
											>
												{item.emoji + ' ' + item.title}
											</Text>
										),
										drawerIcon: () => (
											<Text>{item.emoji}</Text>
										),
										drawerActiveBackgroundColor: item.color,
										drawerLabel: (elem) => (
											<Text
												style={{
													color: elem.focused
														? 'white'
														: elem.color,
												}}
											>
												{item.title}
											</Text>
										),
									}}
								/>
							),
					)}
			</Drawer.Navigator>
			<FlashMessage position='top' />
			<ModalAddTodo
				isOpen={modalData !== null}
				onClose={() => setModalData(null)}
				title={'Add Todo to ' + modalData?.category.title}
			>
				<AddTodoScreen modalData={modalData} />
			</ModalAddTodo>
		</NavigationContainer>
	)
}

const mapStateToProps = (state: { categories: CategoryType[] }) => {
	return {
		categories: state.categories,
	}
}

export default connect(mapStateToProps)(AppNavigator)
