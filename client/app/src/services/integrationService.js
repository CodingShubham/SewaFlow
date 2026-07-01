import api from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get All Integrations
|--------------------------------------------------------------------------
*/

export const getIntegrations = async () => {
    const response = await api.get("/integrations");
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get Single Integration
|--------------------------------------------------------------------------
*/

export const getIntegration = async (id) => {
    const response = await api.get(`/integrations/${id}`);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create Integration
|--------------------------------------------------------------------------
*/

export const createIntegration = async (data) => {
    const response = await api.post("/integrations", data);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update Integration
|--------------------------------------------------------------------------
*/

export const updateIntegration = async (id, data) => {
    const response = await api.put(`/integrations/${id}`, data);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Connect Integration
|--------------------------------------------------------------------------
*/

export const connectIntegration = async (id, credentials) => {
    const response = await api.put(
        `/integrations/${id}/connect`,
        {
            credentials
        }
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Disconnect Integration
|--------------------------------------------------------------------------
*/

export const disconnectIntegration = async (id) => {
    const response = await api.patch(
        `/integrations/${id}/disconnect`
    );

    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete Integration
|--------------------------------------------------------------------------
*/

export const deleteIntegration = async (id) => {
    const response = await api.delete(`/integrations/${id}`);
    return response.data;
};