import { View, Text } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Button onPress={() => router.push('/auth/login')}>
        <Text className="text-white">Login</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
