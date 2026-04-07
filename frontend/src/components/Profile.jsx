import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
export default function Profile() {
    let [user, setUser] = useState(null)
    let nav = useNavigate()
    let getprofile = async () => {
        try {
            let { data } = await axios.get("http://localhost:4000/api/user/getprofile", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            if (data.success) {
                console.log(data.message);
                setUser(data.data)
            } else {
                setUser(null)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
            setUser(null)
        }
    }
    useEffect(() => {
        getprofile()
    }, [])
    let deleteHandler = async () => {
        if (confirm("Are you sure you want to delete this account")) {
            let { data } = await axios.delete("http://localhost:4000/api/user/deleteuser/" + user._id, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (data.success) {
                console.log(data.message);
                localStorage.clear();
                nav("/login")
            } else {
                console.log(data.message)
            }
        }
    }
    return (
        <div className='p-5 bg-info border '>
            <h1> user Profile</h1>
            <p>hello</p>
            <img 
  src={user?.profile?.url || "/default.png"} 
  width="50" 
  height="50" 
  style={{ borderRadius: "100px" }} 
/>
            <p>{user?.name}</p>
            <button onClick={deleteHandler}>delete</button>
            <button onClick={() => {
                localStorage.clear();
                nav("/login")
            }}>Logout</button>
        </div>
    )
}