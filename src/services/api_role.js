import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const getRole = () => {
    return httpClient.get(server.ROLE_URL)
};