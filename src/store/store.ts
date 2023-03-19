import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

import { legacy_createStore } from 'redux'
import todoCategoryReducer from './reducer'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, todoCategoryReducer)

export const store = legacy_createStore(persistedReducer)
export const persistor = persistStore(store)
