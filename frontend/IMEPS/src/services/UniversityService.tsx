import { AxiosInstance } from "axios";

export interface Country {
  name: string;
  code: string;
}

export interface Convention {
  id: number
  name: string;
  date: string;  // ISO format date (YYYY-MM-DD)
  attachment: string;
}

export interface University {
  id: number;
  name: string;
  country: Country;
  convention: Convention;
  logoUrl?: string;
}


// Fetch countries from the backend
export const fetchCountries = async (axiosInstance: AxiosInstance) => {
  try {
    const response = await axiosInstance.get("/countries");
    console.log("Fetched countries:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Fetch universities from the backend
export const fetchUniversities = async (axiosInstance: AxiosInstance) => {
  try {
    const response = await axiosInstance.get("/universities");
    console.log("Fetched universities:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};