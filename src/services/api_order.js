import httpClient from "@/services/httpClient"
import { server } from "@/services/constants"

export const getOrders = () => {
    return httpClient.get(server.ORDER_URL);
}

export const getOrderById = customer_id_pri => {
    return httpClient.get(server.ORDER_URL +  `/customer_id_pri/${customer_id_pri}`);
};

export const addOrder = data => {
    return httpClient.post(server.ORDER_URL,data);
};

export const updateOrder = data => {
    return httpClient.put(server.ORDER_URL,data);
};

export const deleteOrder = order_id_pri => {
    return httpClient.delete(server.ORDER_URL + `/order_id_pri/${order_id_pri}`);
};
