// src/constants/Colors.ts
const tintColorLight = '#0B6A8B'; // A slightly deeper green/blue
const tintColorDark = '#A1DD70'; // A vibrant green for dark mode

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F8F9FA',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    surface: '#FFFFFF', // Card backgrounds
    border: '#E9ECEF',
    danger: '#D9534F',
    success: '#5CB85C'
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    surface: '#212529', // Card backgrounds
    border: '#343A40',
    danger: '#E57373',
    success: '#81C784'
  }
};
