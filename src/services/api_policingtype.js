import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"



export const getPolicingtype = () => {
    return httpClient.get(server.POLICINGTYPE_URL);
}

export const addPolicingtype = data => {
    return httpClient.post(server.POLICINGTYPE_URL,data);
};
export const deletePolicingtype = policingtype_id => {
    return httpClient.delete(server.POLICINGTYPE_URL + `/policingtype_id/${policingtype_id}`);
};
  
export const updatePolicingtype = data => {
    return httpClient.put(server.POLICINGTYPE_URL, data);
};

export const getPolicingtypeById = policingtype_id => {
    return httpClient.get(server.POLICINGTYPE_URL +  `/policingtype_id/${policingtype_id}`);
};
