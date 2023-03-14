import 'react-native-gesture-handler';

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";



import { HomeScreen } from './src/view/HomeScreen';
import { CreateScreen } from './src/view/CreateScreen';
import {HomeIcon} from './src/icon/HomeIcon';
import { CreateIcon } from './src/icon/CreateIcon';

const Drawer = createDrawerNavigator();

export default function App() {
	const scheme = useColorScheme();

	React.useEffect(() => {
		console.log(scheme);
	}, [scheme]);

  	return (
		<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Drawer.Navigator initialRouteName="Home" screenOptions={{
				drawerType: 'back',
			}}>
				<Drawer.Screen name="Home" component={HomeScreen} options={{
					drawerIcon: (item) => (
						<HomeIcon color={item.color} size={item.size} outline={item.focused} />
					)
				}} />
				{/* <Drawer.Screen name="Create" component={CreateScreen} options={{
					drawerIcon: (item) => (
						<CreateIcon color={item.color} size={item.size} outline={item.focused} />
					)
				}} /> */}
			</Drawer.Navigator>
			<FlashMessage position="top" />
		</NavigationContainer>
  );
}

