// src/components/ui/Themed.tsx
import {Colors} from '@/constants/Colors';
import {Text, type TextProps, View, type ViewProps, useColorScheme} from 'react-native';

// Hook to get the correct color for the current theme
export function useThemeColor(props: {light?: string; dark?: string}, colorName: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

// ThemedText Component
type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'link';
};

export function ThemedText({style, lightColor, darkColor, type = 'default', ...rest}: ThemedTextProps) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, 'text');
  // You can add more specific styling for types here if needed
  return <Text style={[{color}, style]} {...rest} />;
}

// ThemedView Component
type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({style, lightColor, darkColor, ...otherProps}: ThemedViewProps) {
  const backgroundColor = useThemeColor({light: lightColor, dark: darkColor}, 'background');
  return <View style={[{backgroundColor}, style]} {...otherProps} />;
}
