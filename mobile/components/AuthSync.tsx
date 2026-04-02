import { useAuthCallback } from "@/hooks/useAuth" 
import { useEffect, useRef } from "react"
import { useAuth, useUser } from "@clerk/clerk-expo"
import * as Sentry from "@sentry/react-native"

const AuthSync = () => {
    const {isSignedIn, getToken} = useAuth()
    const {user} = useUser()
    const {mutate: syncUser} = useAuthCallback();
    const hasSynced = useRef(false);
    
    useEffect(() => {
        if(isSignedIn && user && !hasSynced.current){
            const syncWithRetry = async () => {
                let token = null;
                let attempts = 0;
                
                while (!token && attempts < 5) {
                    token = await getToken();
                    if (!token) {
                        attempts++;
                        await new Promise(res => setTimeout(res, 1000 * attempts));
                    }
                }
                
                if (!token) {
                    console.log("Token never became available, skipping sync");
                    Sentry.logger.warn("Auth token never became available", {
                        userId: user.id,
                    });
                    return;
                }
                
                hasSynced.current = true;
                syncUser(undefined, {
                    onSuccess: (data) => {
                        console.log("User synced with backend: ", data.name);
                        Sentry.logger.info(Sentry.logger.fmt`User synced with backend: ${data.name}`, {
                            userId: user.id,
                            userName: data.name,
                        });
                    },
                    onError: (error) => {
                        hasSynced.current = false;
                        console.log("User sync failed: ", error);
                        Sentry.logger.error("Failed to sync user with backend", {
                            userId: user.id,
                            error: error instanceof Error ? error.message : String(error)
                        });
                    },
                });
            };
            
            syncWithRetry();
        }
        if(!isSignedIn){
            hasSynced.current = false;
        }
    }, [isSignedIn, user, syncUser, getToken])
    
  return null
}
export default AuthSync