import { imageUrl } from "./constants";
import httpClient from "@/services/httpClient";
import { server } from "@/services/constants";

export const getCustomers = () => {
  return httpClient.get(server.CUSTOMER_URL);
};

export const getCountCustomers = () => {
  return httpClient.get(server.COUNTCUSTOMER_URL);
};

export const addCustomer = (data) => {
  return httpClient.post(server.CUSTOMER_URL, data);
};

export const getCustomerById = (customer_id_pri) => {
  return httpClient.get(
    server.CUSTOMER_URL + `/customer_id_pri/${customer_id_pri}`
  );
};

export const deleteCustomer = (customer_id_pri) => {
  return httpClient.delete(
    server.CUSTOMER_URL + `/customer_id_pri/${customer_id_pri}`
  );
};

export const updateCustomer = (data) => {
  return httpClient.put(server.CUSTOMER_URL, data);
};
