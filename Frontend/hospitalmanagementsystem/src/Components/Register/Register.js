import React, { useState, useEffect, useRef } from "react";
import './Register.css'
import { useDispatch } from "react-redux";
//  import { addUser } from "../HospitalSlice"
// import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import registerbg from '../Images/registerbg.jpg'



function Register() {
    const navigate = useNavigate();



    // const inputRef=useRef(null);
    const [role, setRole] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordToggle, setPasswordToggle] = useState(false);
    //var dispatch=useDispatch();
    var myData;

    var checkPassword = () => {
        console.log(confirmPassword);
        if (doctor.password != confirmPassword)
            setPasswordToggle(true)
        else
            setPasswordToggle(false)
    }

    const [doctor, setDoctor] = useState({

        "users": {
            "email": "user@example.com"
        },
        "name": "string",
        "dateOfBirth": "",
        "phoneNumber": "",
        "specialization": "",
        "experience": 0,
        "passwordClear": ""

    })

    const [patient, setPatient] = useState(
        {
            "users": {
                "email": ""

            },
            "name": "Ramu",
            "dateOfBirth": new Date(),
            "phoneNumber": "",
            "gender": "",
            "bloodType": "",
            "passwordClear": ""
        }
    )

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "role": ""
        }
    )

    var doctorRegister = () => {
        console.log(doctor);
        fetch("https://localhost:7132/api/Doctor/RegisterAsDoctor",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },

                "body": JSON.stringify({ ...doctor, "doctor": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    myData = await data.json();
                    settingLocalStorage();
                    navigate("/doctorprofile")

                    console.log(myData);
                }
                else {
                    console.log("error");

                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var patientRegister = () => {
        console.log(patient);
        fetch("https://localhost:7132/api/Patient/RegisterAsPatient",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },

                "body": JSON.stringify({ ...patient, "patient": {} })
            })
            .then(async (data) => {
                if (data.status == 201) {
                    myData = await data.json();
                    // dispatch(addUser(myData));
                    settingLocalStorage();
                    console.log(myData);
                    navigate("/PatientLandingPage")

                    // navigate("/second/"+myData.gender)

                }
            })
            .catch((err) => {
                console.log(err.body)
            })
    }

    var assignEmail = (event) => {
        setDoctor((doctor) => {
            return ({
                ...doctor, "users": { ...doctor.users, ["email"]: event.target.value },
            });
        })
        setPatient((patient) => {
            return ({
                ...patient, "users": { ...patient.users, ["email"]: event.target.value },
            });
        })
    }

    var settingLocalStorage = () => {
        localStorage.setItem("token", myData.token);
        localStorage.setItem("role", myData.role);
        localStorage.setItem("userId", myData.userId);
    }

    useEffect(() => {
        const roleofuser = localStorage.getItem("role");
        setRole(roleofuser)
        console.log(roleofuser)


    }, []);


    return (

        <body class="body-register">
            <section class="container-register">
                <div className="form">


                    {/* <select defaultValue={'DEFAULT'} onChange={(event)=>{
                    setRole(event.target.value)
                }}>
                    <option value="DEFAULT" disabled>Choose....</option>
                    <option value='doctor'>doctor</option>
                    <option value='patient'>patient</option>
                </select> */}
                    <center><h2 > Registration form</h2> </center>

                    <div class="input-box">

                        <label>Name</label>
                        <input type="text" onChange={(event) => {
                            setDoctor({ ...doctor, "name": event.target.value })
                            setPatient({ ...patient, "name": event.target.value })
                        }} />
                    </div>
                    <div class="input-box">


                        <label>Email</label>
                        <input type="email" onChange={assignEmail} />
                    </div>
                    <div class="input-box">

                        <label>Password</label>
                        <input type="password" onChange={(event) => {
                            setDoctor({ ...doctor, "passwordClear": event.target.value })
                            setPatient({ ...patient, "passwordClear": event.target.value })
                        }} />
                    </div>

                    <div class="column">

                        <div class="input-box">


                            <label>Date Of Birth</label>
                            <input type="datetime-local" onChange={(event) => {
                                setDoctor({ ...doctor, "dateOfBirth": event.target.value })
                                setPatient({ ...patient, "dateOfBirth": event.target.value })
                            }} />
                        </div>

                        <div class="input-box">

                            <label>Phone</label>
                            <input type="tel" onChange={(event) => {
                                setDoctor({ ...doctor, "phoneNumber": event.target.value })
                                setPatient({ ...patient, "phoneNumber": event.target.value })
                            }} />
                        </div>
                    </div>



                    {
                        role == "doctor" ? (
                            <div class="input-box">
                                <label>Specialization</label>
                                <input type="text" onChange={(event) => {
                                    setDoctor({ ...doctor, "specialization": event.target.value })
                                }} />
                            </div>
                        ) : (
                            <div>
                                {role == "patient" &&
                                    <div class="input-box">
                                        <label>Blood Group</label>
                                        <input type="text" onChange={(event) => {
                                            setDoctor({ ...patient, "bloodType": event.target.value })
                                        }} />
                                    </div>
                                }
                            </div>)
                    }



                    {
                        role == "doctor" ? (
                            <div class="input-box">
                                <label>Years Of Experience</label>
                                <input type="number" onChange={(event) => {
                                    setDoctor({ ...doctor, "experience": event.target.value })
                                }} />
                            </div>
                        ) : (
                            <div class="input-box">
                                {role == "patient" &&
                                    <div class="gender-box">Gender
                                        <select defaultValue={'DEFAULT'} onChange={(event) => {
                                            setPatient({ ...patient, "gender": event.target.value })
                                        }}>

                                            <option value="DEFAULT" disabled>Select...</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                            <option value='Others'>Others</option>
                                        </select>
                                    </div>
                                }
                            </div>
                        )
                    }

                    {
                        role == "doctor" ? (
                            <div>
                                <button className="btn btn-primary" onClick={doctorRegister}>Register</button>
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-primary" onClick={patientRegister}>Register</button>

                            </div>
                        )
                    }
                </div>
            </section>

        </body>
    )
}
export default Register;