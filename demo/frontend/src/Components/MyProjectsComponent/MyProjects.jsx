import * as React from "react";
import PageName from "../Pagename/PageName";
import "./MyProjectsComponent.css"
import {Link} from "react-router-dom";
import NoDataMessage from "../Messages/NoDataMessage";
import {useEffect, useState} from "react";
import axios from "axios";

export default function MyProjects(props) {
    const [projects, setProject] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/project/")
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }, []);
    return (
        <div>
            <PageName name="My Projects" />
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
                            <th>Owner</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.length === 0 ? (
                            <tr className={"messageRow"}>
                                <NoDataMessage message= "No available projects or you dont have access to view.." />
                            </tr>

                        ) : (
                            projects.map(project => {return(
                                    <tr key={project.id}>
                                        <td>
                                            <a href={`http://localhost:8080/api/project/${project.id}`}>
                                                {project.projectName}
                                            </a>
                                        </td>
                                        <td>{project.status}</td>
                                        <td>{project.createdOn}</td>
                                        <td>{project.owner}</td>
                                        <td>{project.deadLine}</td>
                                    </tr>
                                ) }
                            )
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}