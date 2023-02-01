import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"



export const getDrugtypes = () => {
    return httpClient.get(server.DRUGTYPE_URL);
}

export const addDrugtype = data => {
    return httpClient.post(server.DRUGTYPE_URL,data);
};

export const deleteDrugtype = drugtype_id => {
    return httpClient.delete(server.DRUGTYPE_URL + `/drugtype_id/${drugtype_id}`);
  };
  
export const updateDrugtype = data => {
    return httpClient.put(server.DRUGTYPE_URL, data);
  };

  export const getDrugtypeById = drugtype_id => {
    return httpClient.get(server.DRUGTYPE_URL +  `/drugtype_id/${drugtype_id}`);
  };