import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const getPayment = () => {
    return httpClient.get(server.ORDERPAY_URL);
}
export const getSumPays = () => {
    return httpClient.get(server.SUMORDERPAY_URL);
}

// export const getOrderPayById = customer_id_pri => {
//     return httpClient.get(server.ORDERPAY_URL +  `/customer_id_pri/${customer_id_pri}`);
// };

export const addOrderpay = data => {
    return httpClient.post(server.ORDERPAY_URL,data);
};

// export const updateOrderPay = data => {
//     return httpClient.put(server.ORDERPAY_URL,data);
// };
