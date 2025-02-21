import {AxiosInstance} from "axios";
import {Program} from "./ProgramService.tsx";

export interface Candidature{
    program: Program,
    status: string
}

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    stdId: number;
    academicYear: number;
    department: string;
    grade: number;
    ulBranch: number;
    candidatures: Candidature[];
}

export const fetchStudents = async (
    axiosInstance: AxiosInstance,
    ulBranch: string | null,
    status: string | null,
    scholarship: number | null
) => {
    try {
        // Create an object to hold the query parameters
        const queryParams: Record<string, string | number> = {};

        // Add non-null parameters to the queryParams object
        if (ulBranch) queryParams.ulbranch = ulBranch;
        if (status) queryParams.status = status;
        if (scholarship) queryParams.scholarshipid = scholarship;

        // Convert the queryParams object to a query string
        const queryString = new URLSearchParams(queryParams).toString();

        // Make the request with the query string (if any)
        console.log("filter", `/students${queryString ? `?${queryString}` : ""}`)
        const response = await axiosInstance.get(`/students${queryString ? `?${queryString}` : ""}`);
        console.log("Fetched students:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};

export const postProgramStudent = async (axiosInstance: AxiosInstance, userId: number, programId: number) => {
    try {
        await axiosInstance.post(`/students/${userId}/programs/${programId}`)
        console.log("Posted cadidature");
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}
export const postScholarshipStudent = async (axiosInstance: AxiosInstance, userId: number, scholarshipId: number) => {
    try {
        await axiosInstance.post(`/students/${userId}/scholarships/${scholarshipId}`)
        console.log("Posted cadidature");
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
}
