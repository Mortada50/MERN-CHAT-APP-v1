import { useSocketStore } from "@/lib/socket";
import { useAuth } from "@clerk/clerk-expo";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SocketConnection = () => {
  const { getToken, isSignedIn } = useAuth();
  const queryClient = useQueryClient();
  const connect = useSocketStore((state) => state.connect);
  const disconnect = useSocketStore((state) => state.disconnect);

  useEffect(() => {
    let cancelled = false;
    if (isSignedIn) {
      getToken().then((token) => {
        if (token && !cancelled) connect(token, queryClient);
      });
    } else disconnect();

    return () => {
      cancelled = true;
      disconnect();
    };
  }, [isSignedIn, connect, disconnect, getToken, queryClient]);

  return null;
};

export default SocketConnection;