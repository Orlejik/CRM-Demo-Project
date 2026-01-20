import * as React from "react";
import PageName from "../Pagename/PageName";
import "./MyProjectsComponent.css"
import {Link, useNavigate} from "react-router-dom";
import NoDataMessage from "../Messages/NoDataMessage";
import {useEffect, useState} from "react";
import axios from "axios";

export default function MyProjects(props) {
    const [projects, setProject] = useState([])
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/my/projects`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setProject(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    const handleView = (projectId) => {
        navigate(`/api/projects/${projectId}`); // make sure you have this route in React Router
    };
    return (
        <div>
            <PageName name="My Projects"/>
            <div className="bublePageAdd">
                <Link to="/create-new-project">
                    <div className="bubleLink">
                        <p>
                            +
                        </p>
                    </div>
                </Link>
            </div>

            <div className="container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Created on</th>
                            <th>Dead Line</th>
                            <th>Created By</th>
                            <th>Owner</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.length === 0 ? (
                            <tr className="messageRow">
                                <td colSpan={5}> No available projects or you dont have access to view..</td>
                            </tr>
                        ) : (
                            projects.map(project => (
                                <tr key={project.id}>
                                    <td style={{
                                        cursor: "pointer",
                                        color: "blue",
                                        textDecoration: "none"
                                    }}
                                        onClick={() => handleView(project.id)}>
                                        {project.projectName}
                                    </td>
                                    <td>{project.createdOn}</td>
                                    <td>{project.deadLine}</td>
                                    <td>{project.creatorName}</td>
                                    <td>{project.owner}</td>
                                    <td>{project.status}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}