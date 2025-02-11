import { Image, Platform, View, Text } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text >
        Welcome to the Home Screen
        <HelloWave />
      </Text>
      <Text className='text-lg text-red-800'>Test nativewind</Text>
      <Text>This is a project from capstone</Text>
    </View>
  );
}
