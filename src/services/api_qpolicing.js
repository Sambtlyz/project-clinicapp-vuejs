import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const addqPolicing = data => {
    return httpClient.post(server.QPOLICING_URL,data);
};

export const getqPolicing = () => {
    return httpClient.get(server.QPOLICING_URL)
};

// export const getqPolicingById = qpolicing_id => {
//     return httpClient.get(server.QPOLICING_URL +  `/qpolicing_id/${qpolicing_id}`);
// };

export const getqPolicingById = customer_id_pri => {
    return httpClient.get(server.QPOLICING_URL +  `/customer_id_pri/${customer_id_pri}`);
};