import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from '@clerk/clerk-expo';


const ProfileTab = () => {
  const insets = useSafeAreaInsets();
  const {signOut} = useAuth()
  return (
    <ScrollView
      className='bg-surface'
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom,
      }}
    >
      <Text className='text-white'>ProfileTab</Text>
      <Pressable
        onPress={() => signOut()}
        className='mt-4 bg-red-600 px-4 py-2 rounded-lg'
      >
        <Text>Signout</Text>
      </Pressable>
    </ScrollView>
  )
}

export default ProfileTab