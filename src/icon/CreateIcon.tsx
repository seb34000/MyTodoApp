import React from 'react'
import { Ionicons } from '@expo/vector-icons'

import { IconProps } from '../types/IconProps'

const CreateIcon = ({ color, size, outline }: IconProps) => {
	size = size || 24
	if (!outline) {
		return <Ionicons name='ios-create-outline' size={size} color={color} />
	}
	return <Ionicons name='ios-create' size={size} color={color} />
}

export { CreateIcon }
