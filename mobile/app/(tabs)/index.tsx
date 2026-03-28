import React from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { useChats } from '@/hooks/useChats';
import { Ionicons } from '@expo/vector-icons';
import ChatItem from '@/components/ChatItem';
import EmptyUI from '@/components/EmptyUI';
import { Chat } from '@/types';

const ChatsTab = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {data: chats, isLoading, error} = useChats();
  
  if(isLoading){
    return (
      <View className='flex-1 bg-surface items-center justify-center'>
        <ActivityIndicator size={"large"} color={"#f4A261"} />
      </View>
    )
  }

  if(error){
    return (
      <View className='flex-1 bg-surface items-center justify-center'>
        <Text className='text-red-500'>Failed to load chats</Text>
      </View>
    )
  }

  const handleChatPress = (chat: Chat) => {
    router.push({
      pathname: "/chat/[id]",
      params: {
        id: chat._id,
        participantId: chat.participant._id,
        name: chat.participant.name,
        avatar: chat.participant.avatar,
      }
    })
  };

  return (
    // <ScrollView
    //   className='bg-surface'
    //   contentContainerStyle={{
    //     paddingTop: insets.top + 20,
    //     paddingBottom: insets.bottom,
    //   }}
    // >
      
    //   <Text className='text-white'>ChatsTab1</Text>
    // </ScrollView>

    

    <SafeAreaView className='flex-1 bg-surface'>
      <FlatList 
        data={chats} 
        keyExtractor={(item) => item._id} 
        renderItem={({item}) => <ChatItem chat={item} 
          onPress={() => handleChatPress(item)}/>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24}}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={<EmptyUI 
          title="No chats yet"
          subtitle="Start a conversation!"
          iconName='chatbubbles-outline'
          iconColor='#6B6B70'
          iconSize={64}
          buttonLabel='New Chat'
          onPressButton={() => console.log("press")}

        />}
      />
    </SafeAreaView>
  );
};

export default ChatsTab;


function Header() {
  const router = useRouter();

  return(
    <View className='px-5 pt-2 pb-4'>
      <View className='flex-row items-center justify-between'>
        <Text className='text-2xl font-bold text-foreground'>Chats</Text>
      
        <Pressable 
          className='size-10 bg-primary rounded-full items-center justify-center'
          // onPress={() => router.push("/new-chat")}
        >
          <Ionicons name='create-outline' size={20} color={"#0D0D0F"} />
        </Pressable>
      </View>
    </View>
  )
}