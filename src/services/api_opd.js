import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const getOpd = () => {
    return httpClient.get(server.OPD_URL);
}

export const updateOpd = data => {
    return httpClient.put(server.OPD_URL,data);
};

export const addOpd = data => {
    return httpClient.post(server.OPD_URL,data);
};
export const deleteOpd = opd_id => {
    return httpClient.delete(server.OPD_URL + `/opd_id/${opd_id}`);
};
//get params bycustoemr
export const getOpdById = customer_id_pri => {
    return httpClient.get(server.OPD_URL +  `/customer_id_pri/${customer_id_pri}`);
};
//get params byopd_id
// export const getOpdById = opd_id => {
//     return httpClient.get(server.OPD_URL +  `/opd_id/${opd_id}`);
// };



// export const getOpdById = opd_id => {
//     return httpClient.get(server.OPD_URL +  `/opd_id/${opd_id}`);
// };

// export const getOpdById = opd_id => {
//     return httpClient.get(server.OPD_URL +  `/opd_id/${opd_id}`);
// };