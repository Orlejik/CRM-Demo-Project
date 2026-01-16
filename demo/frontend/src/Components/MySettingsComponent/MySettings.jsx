
import {useEffect, useState} from "react";
import axios from "axios";
export default function MySettings(props) {
    const token = localStorage.getItem("token")
    const[user, setUser] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8080/api/my/user`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [token]);
    if (!user || !user.customerDTO) return <p>Loading...</p>;
    return (
        <section>
            <h2>My profile</h2>
            <ul>
                <li><b>Login:</b> {user.login}</li>
                <li><b>Name:</b> {user.firstName} </li> 
                <li> <b>LastName: </b>{user.lastName}</li>
                <li><b>Role:</b> {user.role}</li>
            </ul>
            <h2>My Customer</h2>
            <ul>
                <li>{user.customerDTO.id}</li>
                <li>{user.customerDTO.nickName}</li>
            </ul>
        </section>
    )
}