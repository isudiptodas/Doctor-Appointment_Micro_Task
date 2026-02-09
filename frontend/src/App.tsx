import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";

const UserWrapper = lazy(() => import("./wrapper/UserWrapper"));
const DoctorWrapper = lazy(() => import("./wrapper/DoctorWrapper"));
const HospitalWrapper = lazy(() => import("./wrapper/HospitalWrapper"));

const UserHome = lazy(() => import("./pages/user/UserHome"));
const AppointmentBook = lazy(() => import("./pages/user/AppointmentBook"));
const AnalyzeReport = lazy(() => import("./pages/user/AnalyzeReport"));
const DiseaseDetection = lazy(() => import("./pages/user/DiseaseDetection"));

const DoctorHome = lazy(() => import("./pages/doctor/DoctorHome"));

const HospitalHome = lazy(() => import("./pages/hospital/HospitalHome"));
const HospitalSettings = lazy(() => import("./pages/hospital/HospitalSettings"));

function App() {
    return (
        <Suspense fallback={<div className={`w-full h-screen bg-white glex justify-center items-center text-gray-500`}>Loading ...</div>}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/recovery" element={<PasswordRecovery />} />

                <Route path="/user/home" element={<UserWrapper><UserHome /></UserWrapper>} />
                <Route path="/user/booking" element={<UserWrapper><AppointmentBook /></UserWrapper>} />
                <Route path="/user/report" element={<UserWrapper><AnalyzeReport /></UserWrapper>} />
                <Route path="/user/detect" element={<UserWrapper><DiseaseDetection /></UserWrapper>} />

                <Route path="/doctor/home" element={<DoctorWrapper><DoctorHome /></DoctorWrapper>} />

                <Route path="/hospital/home" element={<HospitalWrapper><HospitalHome /></HospitalWrapper>} />
                <Route path="/hospital/settings" element={<HospitalWrapper><HospitalSettings /></HospitalWrapper>} />
            </Routes>
        </Suspense>
    );
}

export default App;
