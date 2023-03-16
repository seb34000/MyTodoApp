import 'react-native-gesture-handler'

import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native'
import { useColorScheme, Text } from 'react-native'
import FlashMessage from 'react-native-flash-message'

import { HomeScreen } from './view/HomeScreen'
import { HomeIcon } from './icon/HomeIcon'
import { connect } from 'react-redux'
import { Category } from './redux/categorySlice'
import { CreateScreen } from './view/CreateScreen'
import { CreateIcon } from './icon/CreateIcon'

const Drawer = createDrawerNavigator()

interface Props {
	categories: {
		categories: Category[]
	}
}

function AppNavigator(props: Props) {
	const scheme = useColorScheme()

	return (
		<NavigationContainer
			theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Drawer.Navigator
				initialRouteName='Home'
				screenOptions={{
					drawerType: 'back',
				}}>
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
					}}
				/>
				{props.categories.categories.length > 0 &&
					props.categories.categories.map((item) => (
						<Drawer.Screen
							key={item.id}
							name={item.name}
							component={CreateScreen}
							options={{
								drawerIcon: (elem) => <Text>{item.emoji}</Text>,
								drawerActiveBackgroundColor: item.color,
								drawerLabel: (elem) => (
									<Text
										style={{
											color: elem.focused
												? 'white'
												: elem.color,
										}}>
										{item.name}
									</Text>
								),
							}}
						/>
					))}
				{/* <Drawer.Screen name="Create" component={CreateScreen} options={{
					drawerIcon: (item) => (
						<CreateIcon color={item.color} size={item.size} outline={item.focused} />
					)
				}} /> */}
			</Drawer.Navigator>
			<FlashMessage position='top' />
		</NavigationContainer>
	)
}

const mapStateToProps = (state: any) => {
	return {
		categories: state.categories,
	}
}

export default connect(mapStateToProps)(AppNavigator)
