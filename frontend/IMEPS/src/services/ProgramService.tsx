import {University} from "./UniversityService.tsx";
import {AxiosInstance} from "axios";

// Define types for API responses

export interface Program {
    id: number;
    description: string;
    university: University;
}

export const fetchProgramsByUniversity = async (axiosInstance: AxiosInstance, id: number) => {
    try {
        const response = await axiosInstance.get(`/programs/university/${id}`)
        console.log("Fetched programs:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching programs:", error);
        throw error;
    }
};
// export const createProgram = async (programName: string) => {
//   try {
//     await axiosInstance.post("/programs", { name: programName });
//   } catch (error) {
//     throw new Error("Error creating program");
//   }
// };
//
// export const deleteProgram = async (programId: number) => {
//   try {
//     await axiosInstance.delete(`/programs/${programId}`);
//   } catch (error) {
//     throw new Error("Error deleting program");
//   }
// };
