import Header from "../Components/Header/Header.Header";
import '.././index.css'
import Home from "../Components/HomeComponent/Home";
import Dashboard from "../Components/DashboardComponent/Dashboard";
import {Routes, Route, Navigate} from 'react-router-dom'
import MyProjects from "../Components/MyProjectsComponent/MyProjects";
import MySettings from "../Components/MySettingsComponent/MySettings";
import CreateNewProject from "../Components/CreateNewProjectComponent/CreateNewProject";
import LoginRegisterForm from "../Components/LoginRegisterComponent/LoginRegisterForm";
import ProtectedRoute from "../Security/ProtectedRoute";
import { useAuth } from "../Security/AuthContext";

function App() {
  return (
    <div className="App">
        <Header pageTitle="Front End  Authentication with JWT" />
            <div className="container-fluid">
                
                <Routes>
                    <Route path="/login-register" element={<PublicOnly>
                      <LoginRegisterForm />
                    </PublicOnly>} />
                    <Route path="/" element={<Home />} />
                    <Route element={< ProtectedRoute/>}>
                        <Route path="/dashboard" element={<Dashboard />}/>
                        <Route path="/my-projects" element={<MyProjects />} />
                        <Route path="/my-settings" element={<MySettings />} />
                        <Route path="/create-new-project" element={<CreateNewProject />} />
                        <Route path="/login-register" element={< LoginRegisterForm/>} />
                    </Route>
                </Routes>
            </div>
    </div>
  );
}

export default App;

function PublicOnly({children}){
  const {token} = useAuth();
  return token ? <Navigate to="/" replace /> : children
}