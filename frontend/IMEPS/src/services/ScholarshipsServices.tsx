
export interface Scholarship {
    id: number;
    name: string;
    description: string;
    duration: number;
  }
  import { AxiosInstance } from "axios";
  export const fetchScholarships = async (axiosInstance: AxiosInstance): Promise<Scholarship[]> => {
    try {
      const response = await axiosInstance.get("/scholarships");
      return response.data;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error;
  }
};
  