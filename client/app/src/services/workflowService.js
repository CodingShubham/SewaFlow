import API from "../api/axios";

/*
|--------------------------------------------------------------------------
| Get all workflows
|--------------------------------------------------------------------------
*/

export const getWorkflows = async () => {
    const response = await API.get("/workflows");
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Get single workflow
|--------------------------------------------------------------------------
*/

export const getWorkflow = async (id) => {
    const response = await API.get(`/workflows/${id}`);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Create workflow
|--------------------------------------------------------------------------
*/

export const createWorkflow = async (data) => {
    const response = await API.post("/workflows", data);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Update workflow
|--------------------------------------------------------------------------
*/

export const updateWorkflow = async (id, data) => {
    const response = await API.put(`/workflows/${id}`, data);
    return response.data;
};

/*
|--------------------------------------------------------------------------
| Delete workflow
|--------------------------------------------------------------------------
*/

export const deleteWorkflow = async (id) => {
    const response = await API.delete(`/workflows/${id}`);
    return response.data;
};