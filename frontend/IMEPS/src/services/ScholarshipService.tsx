import {AxiosInstance} from "axios";

export interface Scholarship{
    id: number,
    name: string,
    description: string,
    duration, number
}

export const fetchScholarships = async (axiosInstance: AxiosInstance) => {
    try {
        const response = await axiosInstance.get("/scholarships")
        console.log("Fetched scholarships:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching scholarships:", error);
        throw error;
    }
};