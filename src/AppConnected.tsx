import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigator from './AppNavigator'
// import { store } from './redux/store'
import { store } from './store/store'
import { persistor } from './store/store'

export default function AppConnected() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
				<AppNavigator />
			</PersistGate>
		</Provider>
	)
}
