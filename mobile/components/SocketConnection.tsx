import { useSocketStore } from "@/lib/socket";
import { waitForAuthToken } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-expo";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SocketConnection = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const queryClient = useQueryClient();
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    let cancelled = false;
    if (!isLoaded) return;
    if (isSignedIn) {
      waitForAuthToken(getToken)
        .then((token: any) => {
          if (!cancelled) connect(token, queryClient);
        })
        .catch(() => {
          if (!cancelled) disconnect();
        });
    } else {
      disconnect();
    }
    return () => {
      cancelled = true;
      disconnect();
    };
  }, [isLoaded, isSignedIn, connect, disconnect, getToken, queryClient]);

  return null;
};

export default SocketConnection;