import { Ionicons } from '@expo/vector-icons';
import { IconProps } from '../types/IconProps';

const HomeIcon = ({color, size, outline}: IconProps) => {
    size = size || 24;
    if (!outline) {
        return <Ionicons name="ios-home-outline" size={size} color={color} />;
    }
    return <Ionicons name="ios-home" size={size} color={color} />;
};

export { HomeIcon };