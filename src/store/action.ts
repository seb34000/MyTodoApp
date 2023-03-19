import { TodoType } from '../types/Todo'

export const ADD_TODO_CATEGORY = 'ADD_TODO_CATEGORY'
export const REMOVE_TODO_CATEGORY = 'REMOVE_TODO_CATEGORY'

export const ADD_TODO = 'ADD_TODO'

let nextTodoCategoryId = 0
let nextTodoId = 0

export const addTodoCategory = (
	emoji: string,
	color: string,
	title: string,
) => ({
	type: ADD_TODO_CATEGORY,
	payload: {
		id: nextTodoCategoryId++,
		emoji,
		color,
		title,
		todos: <TodoType[]>[],
	},
})

export const removeTodoCategory = (id: number) => ({
	type: REMOVE_TODO_CATEGORY,
	payload: id,
})

export const addTodo = (
	todoCategoryId: number,
	title: string,
	description: string,
	date: Date,
	priority: number,
) => ({
	type: ADD_TODO,
	payload: {
		id: nextTodoId++,
		todoCategoryId,
		title,
		description,
		date,
		priority,
		active: true,
	},
})
