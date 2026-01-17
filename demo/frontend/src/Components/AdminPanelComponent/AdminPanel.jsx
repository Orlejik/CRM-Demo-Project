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


    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (crmUsers.length === 0) return <p>No users found.</p>;

    return (
        <>
            <PageName name="Admin Panel"/>
            <div className="tabs">
                <Tabs
                    defaultActiveKey="app-settings"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="app-settings" title="App Settings">
                        Tab content for Home
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
                                                    <th style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
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
                                                        <Button variant="danger" onClick={() => handleDelete(customer.id)}>
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