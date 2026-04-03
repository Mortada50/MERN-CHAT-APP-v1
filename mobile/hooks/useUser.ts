import { useQuery } from "@tanstack/react-query";
import type {User} from "@/types"
import { useApi } from "@/lib/axios";

export const useUser = () => {
    const { apiWithAuth, isAuthReady } = useApi();

    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const {data} = await apiWithAuth<User[]>({method: "GET", url: "/users"});
            return data;
        },
        enabled: isAuthReady,
    })
}