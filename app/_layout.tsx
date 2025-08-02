// src/app/_layout.tsx
import {DatabaseProvider} from '@/context/DatabaseProvider';
import {Stack} from 'expo-router';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen
          name="student/[id]"
          options={{
            headerTitle: 'Student Details',
            presentation: 'modal'
          }}
        />
      </Stack>
      <Toast />
    </DatabaseProvider>
  );
}
