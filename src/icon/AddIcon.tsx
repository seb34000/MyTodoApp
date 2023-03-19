import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import { IconProps } from '../types/IconProps'

const AddIcon = ({ color, size, outline }: IconProps) => {
	size = size || 24
	if (!outline) {
		return (
			<Ionicons name='ios-add-circle-outline' size={size} color={color} />
		)
	}
	return <Ionicons name='ios-add-circle' size={size} color={color} />
}

export { AddIcon }
