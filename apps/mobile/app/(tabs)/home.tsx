import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View className='flex items-center justify-center bg-slate-900 h-full'>
      <Text className='text-white text-xl'>This will be the homepage</Text>
      <Text className='text-gray-400 text-3xl'>Test nativewind</Text>
      <Link href="/" className='mt-8'><Text className='text-white text-sm font-semibold'>Back</Text></Link>
    </View>
  )
}

export default Home