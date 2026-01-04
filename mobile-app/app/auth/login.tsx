import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <View className="flex w-full items-start justify-start gap-y-10">
          <View className="flex w-full items-start justify-start gap-y-2 px-6">
            <Text className="text-sm text-neutral-800">Email</Text>
            <Input className="w-full" />
          </View>
          <View className="flex w-full items-start justify-start gap-y-2 px-6">
            <Text className="text-sm text-neutral-800">Password</Text>
            <Input className="w-full" />
          </View>
        </View>
        <View className="absolute bottom-6 flex w-full items-center justify-center gap-y-3">
          <Button className="w-[90%]" size={'lg'}>
            <Text className="font-medium text-white">Login</Text>
          </Button>
          <Text className="text-center text-xs text-neutral-800">
            Don&apos;t have an account? <Text className="font-medium text-primary">Sign Up</Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
