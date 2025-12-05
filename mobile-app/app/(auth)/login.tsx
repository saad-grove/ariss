import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRightIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useRef, useEffect, useState } from 'react';
import { View, Text, Platform, Animated } from 'react-native';

const Login = () => {
  const { colorScheme } = useColorScheme();
  const [hideOTP, setHideOTP] = useState(false);

  // Add Animated value
  const otpOpacity = useRef(new Animated.Value(0)).current;

  // Fade in animation when hideOTP becomes true
  useEffect(() => {
    if (hideOTP) {
      Animated.timing(otpOpacity, {
        toValue: 1,
        duration: 1000, // duration in ms
        useNativeDriver: true,
      }).start();
    } else {
      otpOpacity.setValue(0); // reset opacity if hiding
    }
  }, [hideOTP]);

  return (
    <View className="mb-16 w-full flex-1 items-center justify-center">
      <View className="flex w-full flex-col gap-8 px-6">
        <View className="flex w-full flex-col items-start justify-center gap-2">
          <Text className="text-sm font-medium text-black dark:text-white">Email</Text>
          <View className="flex w-full flex-row items-center justify-center gap-x-2 px-6">
            <Input className={`${Platform.OS === 'ios' ? 'h-10' : 'h-0'}`} />
            <Button variant="outline" onPress={() => setHideOTP(true)}>
              <ArrowRightIcon size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
            </Button>
          </View>
        </View>
        {/* OTP field with fade-in animation */}
        {hideOTP && (
          <Animated.View
            style={{ opacity: otpOpacity }}
            className="flex w-full flex-col items-start justify-center gap-2">
            <Text className="text-sm font-medium text-black dark:text-white">6 Digit OTP</Text>
            <View className="flex w-full flex-row items-center justify-center gap-x-2 px-6">
              <Input className={`${Platform.OS === 'ios' ? 'h-10' : 'h-0'}`} />

              <Button variant="outline">
                <ArrowRightIcon size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
              </Button>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default Login;
