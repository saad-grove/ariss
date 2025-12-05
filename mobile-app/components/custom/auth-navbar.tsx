import { View } from 'react-native';
import React from 'react';
import ThemeToggle from '../ui/theme-toggle';
import { InfoIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const AuthNavbar = () => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex w-full flex-row items-center justify-between bg-background px-6 py-8">
      <InfoIcon size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
      <ThemeToggle />
    </View>
  );
};

export default AuthNavbar;
