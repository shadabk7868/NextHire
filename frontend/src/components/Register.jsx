import axios from 'axios'
import React, { useState } from 'react'
 
export default function Register() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [phoneNumber, setPhoneNumber] = useState("")
    let [profile, setProfile] = useState("")
    let [address, setAddress] = useState("")
    let submitHandler = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("phoneNumber", phoneNumber)
        formdata.append("address", address)
        formdata.append("profile", profile)
        let { data } = await axios.post("http://localhost:4000/api/user/register", formdata, {
           headers: {
        "Content-Type": "multipart/form-data"
}
        })
        console.log(data)
    }
    return (
        <div className='w-50 mx-auto my-5 p-5 bg-primary border rouned-5'>
            <h4>Register</h4>
            <form onSubmit={submitHandler}>
                <div className="mb-3" >
                    <label htmlFor="eml" className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                </div>
                <div className="mb-3"  >
                    <label htmlFor="eml" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="ps" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="eml" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="eml" className="form-label">Address</label>
                    <input type="text" className="form-control" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="eml" className="form-label">Profile</label>
                    <input type="file" className="form-control" onChange={(e) => { setProfile(e.target.files[0]) }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}