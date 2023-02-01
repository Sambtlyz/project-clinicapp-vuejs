import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"


export const getAppointment = () => {
    return httpClient.get(server.APPOINTMENT_URL);
}


export const addAppointment = data => {
    return httpClient.post(server.APPOINTMENT_URL,data);
};

export const updateAppoint = data => {
    return httpClient.put(server.APPOINTMENT_URL,data);
};

export const deleteAppoint = appointment_id_pri => {
    return httpClient.delete(server.APPOINTMENT_URL + `/appointment_id_pri/${appointment_id_pri}`);
};