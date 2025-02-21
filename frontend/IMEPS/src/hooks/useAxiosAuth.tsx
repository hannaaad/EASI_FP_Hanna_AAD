import {useMemo} from "react";
import axios from "axios";

const useAxiosAuth = (username: string, password: string) => {
    return useMemo(() => {
        return axios.create({
            baseURL: "https://localhost:8081",
            withCredentials: false,
            auth: {
                username: username,
                password: password
            }
        });
    }, [username, password]);
};

export const useAxios = () => {
    return useMemo(() => {
        return axios.create({
            baseURL: "https://localhost:8081",
            withCredentials: false
        });
    }, []);
}

export default useAxiosAuth;
