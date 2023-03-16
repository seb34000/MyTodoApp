import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Category {
	id: number
	name: string
	color: string
	emoji: string
}

interface CategoryState {
	categories: Category[]
}

const initialState: CategoryState = {
	categories: [],
}

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		addCategory: (state, action: PayloadAction<Category>) => {
			state.categories.push(action.payload)
		},
	},
})

export const { addCategory } = categorySlice.actions

export default categorySlice.reducer
