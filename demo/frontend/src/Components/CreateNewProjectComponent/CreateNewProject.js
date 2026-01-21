import React, {useEffect, useState} from "react";
import PageName from "../Pagename/PageName";
import axios from "axios";
import "./CreateNewProject.css"
import { useNavigate } from "react-router-dom";
import api from "./../Helpers/AxiosHelper/Axios"
import {request} from "../Helpers/AxiosHelper/AxiosHelper";


export default function CreateNewProject(props){

    const[customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    const [benefeciaries, setBenefeciaries] = useState([]);
    const [cities, setCities] = useState([]);
        const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     axios.get("http://localhost:8080/api/customers", {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     })
    //         .then(res => setCustomers(res.data))
    //         .catch(err => console.error(err));
    // }, []);

    useEffect(() => {
            request("GET", "/api/customers")
                .then((res) => {
                    setCustomers(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load setBenefeciaries data");
                    setLoading(false);
                });
        }, []);


    useEffect(() => {
            request("GET", "/api/benefeciaries")
                .then((res) => {
                    setBenefeciaries(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load setBenefeciaries data");
                    setLoading(false);
                });
        }, []);

        useEffect(() => {
            request("GET", "/api/cities")
                .then((res) => {
                    setCities(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load Cities data");
                    setLoading(false);
                });
        }, []);


    const[formData, setFormData]=useState({
        projectName: "",
        deadLine: "",
        projectDescription: "",
        ownerId: null,
        statusCode: "100"
    })

    const handleChanges = (e)=>{
        const{name, value}=e.target;
        setFormData(prev=>({
            ...prev,
            [name]: value
        }))
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData);
        console.log(customers[0]);
        try{
             
            console.log(formData.createdOn)
            const response = await axios.post(
                "http://localhost:8080/api/project-add",
                formData,
                {headers: {
                Authorization: `Bearer ${token}`
            }}
            )
            navigate("/dashboard")
           console.log(formData);
        }catch (error){
            console.log(error)
        }
    }

    return(
        <div>

            <div>
                <PageName name="Create new Project" />
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                        <div className="labelsInputsBlock inputsFirstRow">
                            <div className="labelsInputs">
                                <label htmlFor="projectName"> Project Name</label>
                                <input id="projectName" required name="projectName" value={formData.projectName} type="text" onChange={handleChanges}/>
                            </div>

                            <div className="labelsInputs">
                                <label htmlFor="deadLine">Dead Line</label>
                                <input id="deadLine" required name="deadLine" value={formData.deadLine} onChange={handleChanges} type="date"/>
                            </div>
                            <div className="labelsInputs">
                                <label htmlFor="customerId">Assign to </label>
                                <select title="assignTo" required id="customerId" name="ownerId" value={formData.customerId} onChange={handleChanges} >
                                    <option value=""> select name</option>
                                    {
                                        customers.map(customer=>{
                                            return(<option key={customer.id} value={parseInt(customer.id)}> {customer.nickName}</option>)
                                        })
                                    }
                                </select>
                            </div>

                            <div className="labelsInputs">
                                <select>
                                    <option>Select city</option>
                                    {cities.map(city=>{
                                        return(
                                            <option key={city.id}>{city.city}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="labelsInputs">
                                <select>
                                    <option>Select Benefeciary</option>
                                    {benefeciaries.map(benef=>{
                                        return(
                                            <option key={benef.id}>{benef.benificiatyFirstName}</option>
                                        )
                                    })}
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="formContainer">
                        <div className=" inputsSecondRow">
                            <div className="labelsInputs">
                                <label htmlFor="projectDescription">Description</label>
                                <textarea name="projectDescription" required value={formData.projectDescription} onChange={handleChanges} id="projectDescription"/>
                            </div>
                        </div>
                    </div>
                    <div className="formContainer">
                        <div className=" inputsSecondRow">
                            <div className="labelsInputs">
                                <button className="btn" type="submit"> Create New Project </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}