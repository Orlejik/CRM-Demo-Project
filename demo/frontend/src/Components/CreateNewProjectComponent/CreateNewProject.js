import React, {useEffect, useState} from "react";
import PageName from "../Pagename/PageName";
import axios from "axios";
import "./CreateNewProject.css"

export default function CreateNewProject(props){

    const[customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/customers")
            .then(res => setCustomers(res.data))
            .catch(err => console.error(err));
    }, []);


    const currentDate = new Date().toLocaleString('sv-SE');

    const[formData, setFormData]=useState({
        projectName: "",
        deadLine: "",
        projectDescription: "",
        createdOn: currentDate,
        owner: "artiom",
        creatorName: "Artiom",
        status: "NEW",
        // messageList: {
        //     customersMessages: 1,
        //     messageContent: "New Project Created!",
        //     author: "artiom"
        // }
    })

    const handleChanges = (e)=>{
      let projectName= e.target.name;
      let deadLine= e.target.name;
      let projectDescription= e.target.name;
      let createdOn= currentDate;
      let owner=  "artiom";
      let creatorName="Artiom Oriol";
      let status =  "NEW";
    };

    let onSubmitnewProject = (e) =>{
        console.log(formData);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:8080/api/project-add",
                formData
            )
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
                {/*<form onSubmit={onSubmitnewProject}>*/}
                    <div className="formContainer">
                        <div className="labelsInputsBlock inputsFirstRow">
                            <div className="labelsInputs">
                                <label htmlFor="projectName"> Project Name</label>
                                <input id="projectName" type="text" onChange={handleChanges}/>
                            </div>

                            <div className="labelsInputs">
                                <label htmlFor="deadLine">Dead Line</label>
                                <input id="deadLine" onChange={handleChanges} type="date"/>
                            </div>
                            <div className="labelsInputs">
                                <label htmlFor="assignTo">Assign to </label>
                                <select id="assignTo"  onChange={handleChanges} >
                                    <option value=""> select name</option>
                                    <option value="value1"> value 1</option>
                                    {
                                        customers.map(customer=>{
                                            <option key={customer.id} value={customer.id}> {customer.nickName}</option>
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
                                <textarea onChange={handleChanges}  id="projectDescription"/>
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