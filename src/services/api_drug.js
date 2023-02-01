import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"


export const getDrugs = () => {
    return httpClient.get(server.DRUG_URL);
}
export const getCountDrug = () => {
  return httpClient.get(server.COUNTDRUG_URL);
}

export const addDrug = data => {
    return httpClient.post(server.DRUG_URL,data);
};

export const deleteDrug = drug_id_pri => {
    return httpClient.delete(server.DRUG_URL + `/drug_id_pri/${drug_id_pri}`);
  };
  
export const updateDrug = data => {
    return httpClient.put(server.DRUG_URL, data);
  };

  export const getDrugById = drug_id_pri => {
    return httpClient.get(server.DRUG_URL +  `/drug_id_pri/${drug_id_pri}`);
  };