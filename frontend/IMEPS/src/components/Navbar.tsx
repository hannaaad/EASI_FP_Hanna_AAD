import React from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, HStack, Image} from "@chakra-ui/react";
import ulfg2logo from "../assets/ulfg2logo.jpg";
import {useUser} from "../services/UserService.tsx";

const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser();

    // Logout function
    const handleLogout = () => {
        setUser(null); // Clear the user object
        navigate("/login"); // Redirect to the login page
    };

    return (
        <HStack background={"primary"} width={"100vw"} height={"50px"}>
            <Image src={ulfg2logo} h={"100%"}/>
            <Box flex={"1"} display={"flex"} justifyContent={"center"} gap={"4"}>
                <Button background={"primary"} color={"white"} width="100px" onClick={() => navigate("/")}>
                    Home
                </Button>
                <Button background={"primary"} color={"white"} width="100px" onClick={() => navigate("/universities")}>
                    Universities
                </Button>
                <Button background={"primary"} color={"white"} width="100px" onClick={() => navigate("/scholarships")}>
                    Scholarships
                </Button>
            </Box>
            <Box py={"2"}>
                {user ? (
                    // Show logout button if user is logged in
                    <Button
                        background={"primary"}
                        color={"white"}
                        alignSelf={"left"}
                        mr={"4"}
                        _hover={{bg: "secondary"}}
                        onClick={() => {
                            handleLogout();
                            navigate("/");
                        }}

                    >
                        Logout
                    </Button>
                ) : (
                    // Show login button if no user is logged in
                    <Button
                        background={"primary"}
                        color={"white"}
                        alignSelf={"left"}
                        mr={"4"}
                        _hover={{bg: "secondary"}}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                )}
            </Box>
        </HStack>
    );
};

export default Navbar;