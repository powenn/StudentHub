import ApiEndpoints from "../interface/ApiEndPoints";

export const api: ApiEndpoints = {
    base: import.meta.env.VITE_API_BASE_URL,
    findAll: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/findAll`,
    insertOne: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/insertOne`,
    deleteByID: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/deleteByID`,
    updateNameByID: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/updateByID`,
};
