import {useParams} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import PageName from "../Pagename/PageName";
import api from "../Helpers/AxiosHelper/Axios";
import {request} from "../Helpers/AxiosHelper/AxiosHelper";
import {Button, Col, FormControl, InputGroup, Row, Form} from "react-bootstrap";
import "./ProjectByIdComponent.css"
import axios from "axios";

export default function ProjectByComponent() {
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([])
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({})
    const [status, setStatus] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    let cancelled = false;
    const [projectForm, setProjectForm] = useState({
        projectName: "",
        ownerId: null,
        statusId: null,
        deadLine: ""
    });
    const hasFetched = useRef(false);
    const handleChanges = (e) => {
        const {name, value} = e.target;
        setProjectForm(prev => ({
            ...prev,
            [name]: value
        }))
    };
    useEffect(() => {
        if (!id || hasFetched.current) return;

        hasFetched.current = true;
        request("GET", `/api/logs/by-project/${id}`)
            .then(res => {
                if (!cancelled) {
                    setLogs(res.data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (!cancelled) {
                    console.error(err);
                    setError("Failed to load logs");
                    setLoading(false);
                }
            });
    }, [id])
    useEffect(() => {
        request("GET", "/api/status")
            .then(res => {
                setStatus(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load Project");
                setLoading(false);
            });
    }, [])
    useEffect(() => {
        request("GET", "/api/customers")
            .then(res => {
                setCustomers(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load Project");
                setLoading(false);
            });
    }, [])
    const sendMessage = async () => {
        if (!messageText.trim()) return;
        await request("POST", `/api/project-messages/project/${id}/post-messages`, {
            messageContent: messageText
        });
        setMessageText(""); // очистить textarea
        loadMessages();
        loadLogs();
    };
    useEffect(() => {
        request("GET", `/api/project-messages/project/${id}/get-messages`)
            .then(res => {
                setMessages(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError("Failed to load Project");
                setLoading(false);
            });
    }, [id])
    const loadMessages = async () => {
        const res = await request("GET", `/api/project-messages/project/${id}/get-messages`);
        setMessages(res.data);
    };
    const loadLogs = async () => {
        const res = await request("GET", `/api/logs/by-project/${id}`);
        setLogs(res.data);
    };
    useEffect(() => {
        loadMessages();
        loadLogs();
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault()
        const payload = {
            projectName: formData.projectName,
            deadLine: formData.deadLine,
            owner: formData.owner,
            status: formData.status,

        }
    }
    const handleUpdateProject = async (projectId) => {
        try {
            const res = await axios.put(
                `http://localhost:8080/api/project-update/${projectId}`,
                projectForm,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Updated project:", res.data);
            setProject(res.data); // update local state
        } catch (err) {
            console.error("Failed to update project", err);
        }
    };
    useEffect(() => {
        request("GET", `/api/project/${id}`)
            .then(res => {
                setProject(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
                setError("Failed to load Project");
                setLoading(false);
            });
    }, [id]);
    if (error) return <p>{error}</p>;
    if (!project) return <p>Loading...</p>;
    return (
        <div>

            <PageName name={"Project " + project.projectName + " details"}/>
            <section className="row justify-content-center mb-4">
                <Col className="container-shadow mt-4" xs={9}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateProject(project.id);
                    }} className="row">
                        <Col sm={6}>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}><InputGroup.Text value={projectForm.projectName} id="basic-addon1" className="text-center"> Project
                                    Name </InputGroup.Text></Col>
                                <Col sm={8}><FormControl className="sm-5 text-center"
                                                         placeholder={project.projectName}
                                                         area-label="projName"
                                                         onChange={handleChanges}
                                                         aria-describedby="basic-addon1"
                                                         /></Col>
                            </InputGroup>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}>
                                    <InputGroup.Text id="basic-addon2 mb-3"> Project DeadLine </InputGroup.Text>
                                </Col>
                                <Col sm={8}>
                                    <FormControl className="sm-5 text-center"
                                                 placeholder={project.deadLine}
                                                 area-label="lastName"
                                                 aria-describedby="basic-addon2"
                                                 disabled={true}/>
                                </Col>
                            </InputGroup>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}>
                                    <InputGroup.Text id="basic-addon3 mb-3"> Project Created On </InputGroup.Text>
                                </Col>
                                <Col sm={8}>
                                    <FormControl className="sm-5 text-center"
                                                 placeholder={project.createdOn}
                                                 area-label="lastName"
                                                 aria-describedby="basic-addon3"
                                                 disabled={true}/>
                                </Col>
                            </InputGroup>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}>
                                    <InputGroup.Text id="basic-addon4 mb-3"> Project Owner </InputGroup.Text>
                                </Col>
                                <Col sm={8}>
                                    <Form.Select onChange={handleChanges} aria-label="status Default select example">
                                        <option value={projectForm.owner}>{project.owner}</option>
                                        {customers.map(customer => {
                                            return (
                                                <option value={projectForm.owner}> {customer.nickName}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Col>
                            </InputGroup>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}><InputGroup.Text id="basic-addon11" className="text-center"> Project
                                    Status </InputGroup.Text></Col>
                                <Col sm={8}>
                                    <Form.Select aria-label="status Default select example">
                                        <option value={projectForm.status} onChange={handleChanges}>{project.status}</option>
                                        {status.map(stat => {
                                            return (
                                                <option key={stat.id}
                                                        value={formData.status}>{stat.displayName}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Col>

                            </InputGroup>
                            <InputGroup className="col-sm-12 mt-3">
                                <Col sm={4}><InputGroup.Text id="basic-addon12"
                                                             className="text-center"> Created
                                    By </InputGroup.Text></Col>
                                <Col sm={8}><FormControl className="sm-5 text-center"
                                                         placeholder={project.creatorName}
                                                         value={formData.creatorName}
                                                         name="creator"
                                                         area-label="creator"
                                                         aria-describedby="basic-addon12"
                                                         onChange={handleChanges}
                                                         disabled={true}/>
                                </Col>
                            </InputGroup>
                        </Col>
                        <Col sm={6}>
                            <div className="mt-3 shadow logsBlock">
                                {logs.map(log => {
                                    return (
                                        <div className=" shadow m-2 p-2" key={log.id}>
                                            <span>{log.logDateTime}</span> <span>{log.logText}</span>
                                        </div>
                                    )
                                })}
                            </div>

                        </Col>
                        <Col sm={12}>
                            <Row>
                                <Col sm={6}>

                                </Col>
                            </Row>
                            <div>
                                <Row className="mt-4">

                                </Row>
                            </div>
                            <div className="d-grid gap-2 mt-5 justify-content-center">
                                <Button variant="outline-primary" id="button-addon1" size="lg" type="submit">
                                    Update Project
                                </Button>
                            </div>
                        </Col>

                    </form>
                </Col>

                <div className="row justify-content-center mb-5 mt-4 messageSection">
                    <Col xs={8}>
                        <div className="messagesBlock shadow">
                            {Array.isArray(messages) ? (
                                messages.map((message, index) => (
                                    <div
                                        key={message.id}
                                        className={`messageItem shadow ${index % 2 === 0 ? "left" : "right"}`}
                                    >
                                        <div className="messageText">{message.messageContent}</div>

                                        <div className="dateAuthor">
                                            <div className="messageAuthor">{message.author}</div>
                                            <div className="messageTime">{message.messageDate}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="error">no messages</div>
                            )}
                        </div>
                    </Col>
                    {/* <Row className="align-items-end"> */}
                    <Col xs={8}>
                        <div className="row justify-content-center mb-5 mt-4 messageSection">
                            <Col xs={9}>
                                <Form.Control
                                    as="textarea"
                                    placeholder="type your message..."
                                    rows={3}
                                    className="no-resize shadow"
                                    onChange={(e) => setMessageText(e.target.value)}
                                />
                            </Col>

                            <Col xs={3} className="d-grid">
                                <Button
                                    variant="outline-primary"
                                    size="lg"
                                    onClick={sendMessage}
                                >
                                    Send
                                </Button>
                            </Col>
                        </div>
                    </Col>
                    {/* </Row> */}
                </div>
            </section>
        </div>

    );
}