import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import "./Dashboard.css"
import PageName from "../Pagename/PageName";
import NoDataMessage from "../Messages/NoDataMessage";

export default function Dashboard(props) {
    const [projects, setProject] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/projects")
            .then(res => {
                console.log("RAW RESPONSE:", res);
                console.log("DATA:", res.data);
                console.log("IS ARRAY:", Array.isArray(res.data));
                setProject(res.data);
            })
            .catch(err => console.error("API ERROR:",err))
    }, []);

    return (
        <div>
            <PageName name="Dashboard"/>

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
                                    <td colSpan={5}>
                                        <NoDataMessage message= "No available projects or you dont have access to view.." />
                                    </td>
                                    
                                </tr>

                        ) : (
                            projects.map(project => {
                                return(
                                    <tr key={project.id}>
                                        <td>
                                            <a href={`http://localhost:8080/api/project/${project.id}`}>
                                            {project.projectName}
                                            </a>
                                        </td>
                                        <td>{project.status.displayName}</td>
                                        <td>{project.createdOn}</td>
                                        <td>{project.creatorName}</td>
                                        <td>{project.deadLine}</td>
                                    </tr>
                                )
                                
                            })
                        )}

                        {/* {Array.isArray(projects) && projects.length === 0 && (
                            <tr className="messageRow">
                                <td colSpan={5}>
                                    <NoDataMessage message="No available projects or you dont have access to view.." />
                                </td>
                            </tr>
                            )}

                        {Array.isArray(projects) && projects.map(project =>  (
                            <tr key={project.id}>
                                <td>
                                <a href={`http://localhost:8080/api/projects/${project.id}`}>
                                    {project.name}
                                </a>
                                </td>
                                <td>{project.status}</td>
                                <td>{project.createdOn}</td>
                                <td>{project.owner}</td>
                                <td>{project.deadLine}</td>
                            </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>
            </div>



        </div>


    )
}