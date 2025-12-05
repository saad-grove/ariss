import { sendOTP } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRightIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';

const Login = () => {
  const { colorScheme } = useColorScheme();
  const [hideOTP, setHideOTP] = useState(false);

  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const handleOTP = async () => {
    setLoading(true);
    try {
      await sendOTP(email);
      setSuccess(true);
      setHideOTP(true);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="mb-16 w-full flex-1 items-center justify-center">
        <View className="flex w-full flex-col gap-8 px-6">
          <View className="flex w-full flex-col items-start justify-center gap-2">
            <Text className="text-sm font-medium text-black dark:text-white">Email</Text>
            <View className="flex w-full flex-row items-center justify-center gap-x-2 px-6">
              <Input
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                className={`${Platform.OS === 'ios' ? 'h-10' : 'h-0'}`}
              />
              <Button variant="outline" onPress={handleOTP}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <ArrowRightIcon size={20} color={colorScheme === 'dark' ? 'white' : 'black'} />
                )}
              </Button>
            </View>
            {error && <Text className="text-xs font-medium text-red-600">Failed to send OTP</Text>}
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
    </TouchableWithoutFeedback>
  );
};

export default Login;
