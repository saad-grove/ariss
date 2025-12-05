import AuthNavbar from '@/components/custom/auth-navbar';
import '@/global.css';

import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ header: () => <AuthNavbar /> }} />
    </Stack>
  );
}
