import React from 'react';
import { useColorScheme } from 'nativewind';
import { Button } from './button';
import { Icon } from './icon';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
};

export default ThemeToggle;
