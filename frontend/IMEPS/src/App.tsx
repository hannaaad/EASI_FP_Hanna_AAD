import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import {Box} from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage.tsx";
import UniversityPage from "./pages/UniversityPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ScholarshipsPage from "./pages/ScholarshipsPage.tsx";
import {UserProvider} from "./services/UserService.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Navbar/>
                <Box backgroundColor={"white"} height={"100vh"} width={"100vw"} overflow={"hidden"}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        {<Route path="/universities" element={<UniversityPage/>}/>}
                        <Route path="/login" element={<LoginPage/>}/>
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute isAdminRequired={true}/>}>
                            <Route path="/admin" element={<AdminPage/>}/>
                        </Route>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/user" element={<UserPage/>}/>
                        </Route>
                        {<Route path="/scholarships" element={<ScholarshipsPage/>}/>}
                    </Routes>
                </Box>
            </Router>
        </UserProvider>
    );
};

export default App;
