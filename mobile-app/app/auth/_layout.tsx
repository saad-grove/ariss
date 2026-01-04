import { View, Text } from 'react-native'
import React from 'react'
import { useColorScheme } from 'nativewind';
import { ThemeProvider } from '@react-navigation/native';
import { NAV_THEME } from '@/lib/theme';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{headerShown: false}} />
    </ThemeProvider>
  );
}

export default AuthLayout