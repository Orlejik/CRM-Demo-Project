import Header from "../Components/Header/Header.Header";
import '.././index.css'
import Home from "../Components/HomeComponent/Home";
import Dashboard from "../Components/DashboardComponent/Dashboard";
import {Routes, Route, Navigate} from 'react-router-dom'
import MyProjects from "../Components/MyProjectsComponent/MyProjects";
import MySettings from "../Components/MySettingsComponent/MySettings";
import CreateNewProject from "../Components/CreateNewProjectComponent/CreateNewProject";
import LoginRegisterForm from "../APP/LoginAndRegister/LoginRegisterForm";
import ProtectedRoute from "../Security/ProtectedRoute";
import {useAuth} from "../Security/AuthContext";
import RoleRoute from "../Security/RoleRoute";
import AdminPanel from "./../Components/AdminPanelComponent/AdminPanel"
import {useEffect} from "react";
import {setupAxiosInterceptors} from "../Components/Helpers/AxiosHelper/AxiosInterceptors";
import NotFound from "../Components/NotFoundComponent/NotFound";
import UserDetails from "../Components/UserDetailsComponent/UserDetails";
import ProjectByComponent from "../Components/ProjectByIDComponent/ProjectByComponent"

function App() {
    const {logout} = useAuth();
    useEffect(() => {
        setupAxiosInterceptors(logout);
    }, []);
    return (
        <div className="App">
            <Header pageTitle="Front End  Authentication with JWT"/>
            <div className="container-fluid">

                <Routes>
                    <Route path="/login-register" element={<PublicOnly>
                        <LoginRegisterForm/>
                    </PublicOnly>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route element={< ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/my-projects" element={<MyProjects/>}/>
                        <Route path="/my-settings" element={<MySettings/>}/>
                        <Route path="/create-new-project" element={<CreateNewProject/>}/>
                        <Route path="/project/:id" element={<ProjectByComponent />} />

                        <Route element={<RoleRoute allowedRoles={["ADMIN"]}/>}>
                            <Route path="/admin" element={<AdminPanel message="Admin"/>}/>
                            <Route path="/users/:id" element={<UserDetails/>}/>
                            
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;

function PublicOnly({children}) {
    const {token} = useAuth();
    return token ? <Navigate to="/" replace/> : children
}