import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";


const URL = 'http://localhost:3000/api'

export const getAllVehicles = async (
    // dispatch, 
    // vehicleObj
) => {
    // console.log(vehicleObj);
    const toastId = toast.loading("Wait..");
    try {
        const response = await apiConnector("GET", `${URL}/vehicles/getVehicleData`);
        console.log("response =>", response);

        if (response.data.status !== 200) {
            toast.error("Error fetching vehicles!");
            return undefined; // Return undefined if response is not valid
        }

        // dispatch(setVehicles(vehicles)); // Dispatch the action to set vehicles in the store
        // localStorage.setItem("vehicles", JSON.stringify(vehicles)); // Store vehicles in localStorage
        
        console.log("Vehicles stored in localStorage:", response.data);
        return response.data; // Return the vehicles array
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "An error occurred.");
        return undefined; // Return undefined in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};

export const getFilterVehicles = async (
    startDate, endDate
) => {
    // console.log(vehicleObj);
    const toastId = toast.loading("Wait..");
    try {
        const response = await apiConnector("POST", `${URL}/vehicles/getVehicleFilterData`,{
            startDate, endDate
        });
        console.log("response =>", response);

        if (response.data.status !== 200) {
            toast.error("Error fetching vehicles!");
            return undefined; // Return undefined if response is not valid
        }

        // dispatch(setVehicles(vehicles)); // Dispatch the action to set vehicles in the store
        // localStorage.setItem("vehicles", JSON.stringify(vehicles)); // Store vehicles in localStorage
        
        console.log("Vehicles stored in localStorage:", response.data);
        return response.data; // Return the vehicles array
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "An error occurred.");
        return undefined; // Return undefined in case of an error
    } finally {
        toast.dismiss(toastId);
    }
};