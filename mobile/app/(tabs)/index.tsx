import { View, Text, ScrollView } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from 'react'

const ChatsTab = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      className='bg-surface'
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom,
      }}
    >
      <Text className='text-white'>ChatsTab1</Text>
      <Text>hello world</Text>
    </ScrollView>
  );
};

export default ChatsTab;