import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    </ScrollView>
  );
};

export default ChatsTab;