import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"


export const getPolicings = () => {
    return httpClient.get(server.POLICING_URL);
}
export const getCountPolicings = () => {
    return httpClient.get(server.COUNTPOLICING_URL);
}

export const addPolicing = data => {
    return httpClient.post(server.POLICING_URL,data);
};

export const deletePolicing = policing_id_pri => {
    return httpClient.delete(server.POLICING_URL + `/policing_id_pri/${policing_id_pri}`);
};
  
export const updatePolicing = data => {
    return httpClient.put(server.POLICING_URL, data);
};

export const getPolicingById = policing_id_pri => {
    return httpClient.get(server.POLICING_URL +  `/policing_id_pri/${policing_id_pri}`);
};