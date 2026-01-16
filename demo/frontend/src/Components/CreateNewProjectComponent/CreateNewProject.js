import React, {useEffect, useState} from "react";
import PageName from "../Pagename/PageName";
import axios from "axios";
import "./CreateNewProject.css"
import { useNavigate } from "react-router-dom";


export default function CreateNewProject(props){

    const[customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(() => {
        axios.get("http://localhost:8080/api/customers", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    }, []);

    const[formData, setFormData]=useState({
        projectName: "",
        deadLine: "",
        projectDescription: "",
        ownerId: null
    })

    const handleChanges = (e)=>{

        const{name, value}=e.target;

        setFormData(prev=>({
            ...prev,
            [name]: value
        }))

        console.log(e.target.value)
    };
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(formData);
        console.log(customers[0]);
        try{
             
            console.log(formData.createdOn)
            const response = await axios.post(
                "http://localhost:8080/api/project-add",
                formData
            )
            navigate("/dashboard")
           console.log(response.data);
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
                {/* <form onSubmit={onSubmitnewProject}> */}
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