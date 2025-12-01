import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";
import LoginUser from "./pages/LoginUser";
import LoginAdmin from "./pages/LoginAdmin";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/user" element={<UserView />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/login/admin" element={<LoginAdmin />} />
        </Routes>
    );
}
