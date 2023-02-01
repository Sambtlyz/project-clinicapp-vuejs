import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const addRoom = data => {
    return httpClient.post(server.ROOM_URL,data);
};

export const getRoom = () => {
    return httpClient.get(server.ROOM_URL)
};

export const deleteRoomadd = room_id => {
    return httpClient.delete(server.ROOM_URL + `/room_id/${room_id}`);
};