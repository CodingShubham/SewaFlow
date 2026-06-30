import API from "../api/axios";

export const createBusinessConfig = async (data) => {
    const response = await API.post("/business-config", data);
    return response.data;
};

export const getBusinessConfig = async () => {
    const response = await API.get("/business-config");
    return response.data;
};

export const updateBusinessConfig = async (data) => {
    const response = await API.put("/business-config", data);
    return response.data;
};