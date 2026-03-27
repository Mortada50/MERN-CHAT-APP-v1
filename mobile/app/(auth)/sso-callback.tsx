import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function SSOCallback() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn]);
  return (
     <View className="flex-1 justify-center items-center bg-gray-800">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
// todo: عندما يتم تسجيل الدخول عند التحميل يرجع لصفحة تسجيل الدخول 