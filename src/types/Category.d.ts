import { TodoType } from './Todo'

export interface CategoryType {
	id: number
	title: string
	color: string
	emoji: string
	todos: TodoType[]
}
