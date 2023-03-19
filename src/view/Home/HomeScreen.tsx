import React, { useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import moment, { Moment } from 'moment'

import { CategoryType } from '../../types/Category'
import { connect } from 'react-redux'
import { hexToRgba } from '../../utils/hexToRgba'

interface itemForList {
	id: number
	title: string
	description: string
	priority: number
	active: boolean
	date: Date
	categoryTitle: string
	color: string
	emoji: string
}

const HomeListTodo = (data: itemForList[]) => {
	const colors = useTheme()

	return (
		<FlatList
			data={data}
			horizontal
			style={{ padding: 10 }}
			showsHorizontalScrollIndicator={false}
			renderItem={({ item }) => {
				return (
					<View
						style={{
							backgroundColor: hexToRgba(
								item.color,
								item.priority * 0.1,
							),
							borderRadius: 10,
							padding: 10,
							margin: 5,
						}}
					>
						<Text
							style={{
								color: colors.colors.text,
								fontWeight: 'bold',
							}}
						>
							{item.title} - {item.categoryTitle} {item.emoji}
						</Text>
						<Text
							style={{
								color: colors.colors.text,
							}}
						>
							{item.description}
						</Text>
					</View>
				)
			}}
		/>
	)
}

const HomeScreen = (props: any) => {
	const colors = useTheme()

	const [todoListByPriority, setTodoListByPriority] = React.useState<
		itemForList[]
	>([])
	const [todoListByDate, setTodoListByDate] = React.useState<itemForList[]>(
		[],
	)
	const [todoListByCategory, setTodoListByCategory] = React.useState<
		itemForList[]
	>([])

	useEffect(() => {
		const tmp: itemForList[] = []
		props.categories.forEach((item: CategoryType) => {
			item.todos.forEach((todo) => {
				tmp.push({
					id: todo.id,
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					active: todo.active,
					date: todo.date,
					categoryTitle: item.title,
					color: item.color,
					emoji: item.emoji,
				})
			})
		})
		const priority = tmp.filter((item) => item.active)
		setTodoListByPriority(
			priority.sort((a, b) => {
				if (a.priority === b.priority) {
					return a.date.getSeconds() - b.date.getSeconds()
				}
				return b.priority - a.priority
			}),
		)
		const date = tmp.filter((item) => item.active)
		setTodoListByDate(
			date.sort((a, b) => {
				return moment(a.date).unix() - moment(b.date).unix()
			}),
		)

		const category = tmp.filter((item) => item.active)
		setTodoListByCategory(
			category.sort((a, b) => {
				if (a.categoryTitle === b.categoryTitle) {
					return moment(a.date).unix() - moment(b.date).unix()
				}
				return a.categoryTitle.localeCompare(b.categoryTitle)
			}),
		)
	}, [props.categories])

	return (
		<View
			style={[
				styles.container,
				{ backgroundColor: colors.colors.background },
			]}
		>
			<View style={[styles.box, { backgroundColor: colors.colors.card }]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Todo active by priority
				</Text>
				{HomeListTodo(todoListByPriority)}
			</View>
			<View style={[styles.box, { backgroundColor: colors.colors.card }]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Todo active by date
				</Text>
				{HomeListTodo(todoListByDate)}
			</View>
			<View style={[styles.box, { backgroundColor: colors.colors.card }]}>
				<Text style={[styles.boxTitle, { color: colors.colors.text }]}>
					Todo active by category
				</Text>
				{HomeListTodo(todoListByCategory)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	box: {
		margin: 10,
		width: '95%',
		borderRadius: 10,
	},

	boxTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10,
	},
})

const mapStateToProps = (state: { categories: CategoryType[] }) => {
	return {
		categories: state.categories,
	}
}

export default connect(mapStateToProps)(HomeScreen)
