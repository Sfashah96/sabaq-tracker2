// src/components/ui/IconSymbol.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {type StyleProp, type TextStyle} from 'react-native';

// Map SF Symbol names (or conceptual names) to Material Icons
const MAPPING = {
  'person.3.fill': 'people',
  'clock.arrow.circlepath': 'history',
  plus: 'add',
  'trash.fill': 'delete',
  'chevron.right': 'chevron-right',
  'checkmark.circle.fill': 'check-circle',
  circle: 'radio-button-unchecked'
} as const;

type IconName = keyof typeof MAPPING;

export function IconSymbol({name, size = 24, color, style}: {name: IconName; size?: number; color: string; style?: StyleProp<TextStyle>}) {
  return <MaterialIcons name={MAPPING[name]} size={size} color={color} style={style} />;
}
