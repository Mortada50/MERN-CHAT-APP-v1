import { useAuthCallback } from "@/hooks/useAuth" 
import { useEffect, useRef } from "react"
import { useAuth, useUser } from "@clerk/clerk-expo"
import * as Sentry from "@sentry/react-native"
import type { AxiosError } from "axios";

const MAX_SYNC_ATTEMPTS = 4;

const AuthSync = () => {
    const {isSignedIn, isLoaded} = useAuth()
    const {user} = useUser()
    const {mutate: syncUser} = useAuthCallback();
    const hasSynced = useRef(false);
    const isSyncInFlight = useRef(false);
    const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    useEffect(() => {
          if(!isLoaded) return;

        if(!isSignedIn){
            hasSynced.current = false;
            isSyncInFlight.current = false;
            if (retryTimeout.current) clearTimeout(retryTimeout.current);
            return;
        }

        if(!user || hasSynced.current || isSyncInFlight.current) return;

        let cancelled = false;

        const attemptSync = (attempt: number) => {
            if (cancelled) return;
            isSyncInFlight.current = true;

                syncUser(undefined, {
                    onSuccess: (data) => {
                        isSyncInFlight.current = false;
                        hasSynced.current = true;
                        console.log("User synced with backend: ", data.name);
                        Sentry.logger.info(Sentry.logger.fmt`User synced with backend: ${data.name}`, {
                            userId: user.id,
                            userName: data.name,
                        });
                    },
                    onError: (error) => {
                         isSyncInFlight.current = false;
                        hasSynced.current = false;
                        console.log("User sync failed: ", error);
                         const status = (error as AxiosError)?.response?.status;
                        const shouldRetry = attempt < MAX_SYNC_ATTEMPTS && (!status || status === 401 || status >= 500);

                        if (shouldRetry) {
                            const delay = 1000 * attempt;
                            retryTimeout.current = setTimeout(() => attemptSync(attempt + 1), delay);
                            Sentry.logger.warn("Retrying user sync", {
                                userId: user.id,
                                attempt,
                                status,
                                nextRetryInMs: delay,
                            });
                            return;
                        }

                        Sentry.logger.error("Failed to sync user with backend", {
                            userId: user.id,
                             status,
                            error: error instanceof Error ? error.message : String(error)
                        });
                    },
                });
            };
            
              attemptSync(1);

        return () => {
            cancelled = true;
            if (retryTimeout.current) clearTimeout(retryTimeout.current);
        };
    }, [isLoaded, isSignedIn, user, syncUser])
    
  return null
}
export default AuthSync