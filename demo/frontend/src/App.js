import Header from "./Components/Header/Header.Header";
import './index.css'
import Home from "./Components/HomeComponent/Home";
import Dashboard from "./Components/DashboardComponent/Dashboard";
import {Routes, Route} from 'react-router-dom'
import MyProjects from "./Components/MyProjectsComponent/MyProjects";
import MySettings from "./Components/MySettingsComponent/MySettings";
import CreateNewProject from "./Components/CreateNewProjectComponent/CreateNewProject";
import LoginRegisterForm from "./Components/LoginRegisterComponent/LoginRegisterForm";

function App() {
  return (
    <div className="App">
        <Header pageTitle="Front End  Authentication with JWT" />
            <div className="container-fluid">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-projects" element={<MyProjects />} />
                    <Route path="/my-settings" element={<MySettings />} />
                    <Route path="/create-new-project" element={<CreateNewProject />} />
                    <Route path="/login-register" element={< LoginRegisterForm/>} />
                </Routes>
            </div>
    </div>
  );
}

export default App;
