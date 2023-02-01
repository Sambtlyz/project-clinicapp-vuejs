import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const addopdPolicing = data => {
    return httpClient.post(server.POLICING_TEMP,data);
};

export const getopdPolicing = () =>  {
    return httpClient.get(server.POLICING_TEMP)
};