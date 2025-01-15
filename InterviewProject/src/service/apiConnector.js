import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    withCredentials: true
});

// Define the API connector function
export const apiConnector = async (
    method,
    url,
    bodydata = null, // Default to null if not provided
    headers = {}, // Default to an empty object if not provided
    params = {} // Default to an empty object if not provided
) => {
    // console.log("API CONNECTOR = ", url, bodydata);
    return axiosInstance({
        method,
        url,
        data: bodydata,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        params
    });
};