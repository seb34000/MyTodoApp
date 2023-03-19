import { ADD_TODO_CATEGORY, REMOVE_TODO_CATEGORY, ADD_TODO } from './action'
import { CategoryType } from '../types/Category'
import { TodoType } from '../types/Todo'

const initialState: { categories: CategoryType[] } = {
	categories: [],
}

const todoCategoryReducer = (
	state = initialState,
	action: { type: string; payload: any },
) => {
	switch (action.type) {
		case ADD_TODO_CATEGORY:
			const { id, emoji, color, title, todos } = action.payload
			return {
				...state,
				categories: [
					...state.categories,
					{ id, emoji, color, title, todos },
				],
			}
		case REMOVE_TODO_CATEGORY:
			return {
				...state,
				categories: state.categories.filter(
					(category) => category.id !== action.payload,
				),
			}
		case ADD_TODO:
			console.log('ADD_TODO')
			const { todoCategoryId } = action.payload
			return {
				...state,
				categories: state.categories.map((category) => {
					if (category.id === todoCategoryId) {
						const newTodos: TodoType = {
							id: action.payload.id,
							todoCategoryId: action.payload.todoCategoryId,
							title: action.payload.title,
							description: action.payload.description,
							date: action.payload.date,
							priority: action.payload.priority,
							active: action.payload.active,
						}
						category.todos.push(newTodos)
					}
					return category
				}),
			}
		default:
			return state
	}
}

export default todoCategoryReducer
