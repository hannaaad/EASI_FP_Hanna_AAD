import {AxiosInstance} from "axios";

export interface FileRequest {
    headers: string[],
    rows: string[][],
    title: string
}

export const fetchPDF = async (axiosInstance: AxiosInstance, pdfRequest: FileRequest) => {
    try {
        const response = await axiosInstance.post("/pdf", pdfRequest, {
            responseType: 'blob', // Specify the response type as blob to handle binary data
        });

        // Create a Blob from the PDF response
        const file = new Blob([response.data], { type: 'application/pdf' });

        // Create a link element to trigger the download
        const link = document.createElement('a');

        // Create an Object URL from the Blob
        link.href = URL.createObjectURL(file);
        link.download = 'file.pdf'; // Set the default filename for the download

        // Append the link to the DOM and trigger a click event to download the file
        document.body.appendChild(link);
        link.click();

        // Remove the link from the DOM after download
        document.body.removeChild(link);

        console.log("PDF downloaded successfully.");
    } catch (error) {
        console.error("Error fetching PDF:", error);
        throw error;
    }
};

export const fetchCSV = async (axiosInstance: AxiosInstance, fileRequest: FileRequest) => {
    try {
        const response = await axiosInstance.post("/csv", fileRequest, {
            responseType: 'blob', // Specify the response type as blob to handle binary data
        });

        const file = new Blob([response.data], { type: 'test/csv' });

        const link = document.createElement('a');

        // Create an Object URL from the Blob
        link.href = URL.createObjectURL(file);
        link.download = 'file.csv'; // Set the default filename for the download

        // Append the link to the DOM and trigger a click event to download the file
        document.body.appendChild(link);
        link.click();

        // Remove the link from the DOM after download
        document.body.removeChild(link);

        console.log("CSV downloaded successfully.");
    } catch (error) {
        console.error("Error fetching CSV:", error);
        throw error;
    }
};
export const fetchConvention = async (axiosInstance: AxiosInstance, conventionId: number) => {
    try {
        const response = await axiosInstance.get(`/conventions/${conventionId}/attachment`, {
            responseType: 'blob', // Specify the response type as blob to handle binary data
        });

        const file = new Blob([response.data], { type: 'application/pdf' });

        const link = document.createElement('a');

        // Create an Object URL from the Blob
        link.href = URL.createObjectURL(file);
        link.download = 'convention.pdf'; // Set the default filename for the download

        // Append the link to the DOM and trigger a click event to download the file
        document.body.appendChild(link);
        link.click();

        // Remove the link from the DOM after download
        document.body.removeChild(link);

        console.log("Convention downloaded successfully.");
    } catch (error) {
        console.error("Error fetching convention file:", error);
        throw error;
    }
};