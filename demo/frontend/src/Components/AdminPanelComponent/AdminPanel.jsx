import React from "react";
import PageName from "../Pagename/PageName";
import {Tab, Table, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import {request} from "../Helpers/AxiosHelper/AxiosHelper";
import {Button} from "react-bootstrap";
import NoDataMessage from "../Helpers/NoDataMessage";
import {useNavigate} from "react-router-dom";

export default props => {
    const [crmUsers, setCrmUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [config, setConfig] = useState([])
    const [messages, setMessages] = useState([])
    const [logs, setLogs] = useState([])
    const [projects, setProjects] = useState([])

    /**
     * ------------------------------------------------------------------------------------------------------------
     * ------------------------------Admin Side
     * ------------------------------Application Properties section
     */
    useEffect(() => {
        request("GET", "/api/config")
            .then(res => setConfig(res.data))
            .catch(err => console.error(err));
    }, []);
    const handleSave = () => {
        request("PUT", "/api/config", config)
            .then(res => alert("Saved"))
            .catch(err => alert("Error"));
    };
    /**
     * ------------------------------ Completed Application Properties section
     * ------------------------------------------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------------------------------------------
     * ------------------------------Admin Side
     * ------------------------------Users and Customers section
     */

    useEffect(() => {
        request("GET", "/api/users")
            .then((res) => {
                setCrmUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        request("GET", "/api/customers")
            .then((res) => {
                setCustomers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    // Delete a user
    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await request("DELETE", `/api/users/${userId}`);
            // Remove from state
            setCrmUsers((prev) => prev.filter((u) => u.id !== userId));
        } catch (err) {
            console.error(err);
            alert("Failed to delete user");
        }
    };

    // Navigate to user details page
    const handleView = (userId) => {
        navigate(`/users/${userId}`); // make sure you have this route in React Router
    };

    // Navigate to edit page
    const handleEdit = (userId) => {
        navigate(`/users/${userId}/edit`); // edit page route
    };
    /**
     * ------------------------------ Completed Users And Customers Section
     * ------------------------------------------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------------------------------------------
     * ------------------------------Admin Side-------------------------------------------------------------------
     * ------------------------------Projects section ----------------------------------------------------------
     */
    useEffect(() => {
        request("GET", "/api/projects")
            .then((res) => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load projects data");
                setLoading(false);
            });
    }, []);
    /**
     * ------------------------------ Completed Projects section --------------------------------------------------
     * ------------------------------------------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------------------------------------------
     * ------------------------------ Admin Side
     * ------------------------------ Messages section
     */
    useEffect(() => {
        request("GET", "/api/project-messages")
            .then((res) => {
                setMessages(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load Messages data");
                setLoading(false);
            });
    }, []);

    /**
     * ------------------------------ Completed Messages Section
     * ------------------------------------------------------------------------------------------------------------
     */

    /**
     * ------------------------------------------------------------------------------------------------------------
     * ------------------------------Admin Side
     * ------------------------------Logs section
     */
    useEffect(() => {
        request("GET", "/api/logs")
            .then((res) => {
                setLogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load user data");
                setLoading(false);
            });
    }, []);

    /**
     * ------------------------------ Completed Logs Section
     * ------------------------------------------------------------------------------------------------------------
     */

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (crmUsers.length === 0) return <p>No users found.</p>;

    return (
        <>
            <PageName name="Admin Panel"/>
            <div className="tabs">
                <Tabs defaultActiveKey="app-settings" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="app-settings" title="App Settings">
                        <div>
                            {!config ? (
                                <NoDataMessage message="No available config"/>
                            ) : (
                                <div>
                                    <div>ID: {config.id}</div>
                                    <div>Theme: {config.theme}</div>
                                    <div>Language: {config.defaultLanguage}</div>
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="users" title="Users">
                        <Tabs defaultActiveKey="crmUsers" id="uncontrolled-tab-example" className="mb-3">
                            <Tab title="Users" eventKey="crmUsers">
                                {!loading && !error && crmUsers.length === 0 ? (
                                    <span className={"messageRow"}>
                                        <span>
                                            <NoDataMessage message="No users....check.."/>
                                        </span>

                    </span>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Projects Number</th>
                                            <th>Is Active</th>
                                            <th>Is Blocked</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                        </thead>
                                        <tbody>
                                        {crmUsers.map(user => {
                                            return (
                                                <tr key={user.id}>
                                                    <th>{user.id}</th>
                                                    <th>{user.firstName}</th>
                                                    <th style={{
                                                        cursor: "pointer",
                                                        color: "blue",
                                                        textDecoration: "underline"
                                                    }}
                                                        onClick={() => handleView(user.id)}>{user.login}</th>
                                                    <th>0</th>
                                                    <th>{user.isActive ? "Active" : "Not Active"}</th>
                                                    <th>{user.isBlocked ? "Blocked" : "Not Blocked"}</th>
                                                    <th>
                                                        <Button onClick={() => handleEdit(user.id)}>
                                                            Edit
                                                        </Button>
                                                    </th>
                                                    <th>
                                                        <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                                            Delete
                                                        </Button>
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                )}
                            </Tab>
                            <Tab title="Customers" eventKey="customers">
                                {!loading && !error && crmUsers.length === 0 ? (
                                    <span className={"messageRow"}>
                                        <span>
                                            <NoDataMessage message="No users....check.."/>
                                        </span>

                                    </span>
                                ) : (
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nick Name</th>
                                            <th>Projects number</th>
                                            <th>Customer Logs</th>
                                            <th>Messages Number</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>

                                        </thead>
                                        <tbody>
                                        {customers.map(customer => {
                                            return (
                                                <tr key={customer.id}>
                                                    <th>{customer.id}</th>
                                                    <th>{customer.nickName}</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>0</th>
                                                    <th>
                                                        <Button onClick={() => handleEdit(customer.id)}>
                                                            Edit
                                                        </Button>
                                                    </th>
                                                    <th>
                                                        <Button variant="danger"
                                                                onClick={() => handleDelete(customer.id)}>
                                                            Delete
                                                        </Button>
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                )}
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="projects" title="Projects">
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="messages" title="Messages">
                        Tab content for Contact
                    </Tab>
                    <Tab eventKey="logs" title="Logs">
                        Tab content for Contact
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}