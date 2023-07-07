import { useState, useEffect } from "react";
import axios from 'axios';
import './doctorlandingpage.css';
import profile from '../Images/doctor.png';
import React from "react";
import phoneicon from "../Images/phone.png"

import Login from "../LoginandSignUp/login";
import { Link } from "react-router-dom";


function DoctorProfile() {
  const [user, setUser] = useState(
    {
      "doctorId": 0,
      "users": {},
      "name": "",
      "dateOfBirth": new Date(),
      "phoneNumber": "",
      "specialization": "",
      "experience": 0,
      "status": ""
    }
  );
  const [patients, setPatients] = useState([]);



  const GetAllPatients = async () => {
    try {
      const response = await fetch('https://localhost:7132/api/Patient/GetAllPatients');
      const data = await response.json();
      setPatients(data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetAllPatients();
  },);

  const [updateStatus, setUpdateStatus] = useState(true);
  const [classUpdate, setClassUpdate] = useState("input");

  const userId = Number(localStorage.getItem("userId"));




  const GetAllDoctors = async () => {
    try {
      const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
      var data = await response.json();
      console.log(data[0])
      var doctor = data.filter(d => d.doctorId == userId);
      // setUser({...user,doctor});
      setUser(doctor[0]);
      console.log(user.name)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [updateddata, setupdatedData] = useState('');

  const updateData = () => {
    fetch('https://localhost:7132/api/Doctor/UpdateDoctorDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'new value' }),
    })
      .then(response => response.json())
      .then(updatedData => {
        setupdatedData(updatedData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

 



  useEffect(() => {
    GetAllDoctors();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">

          <a href="/">Apollo Hospital</a>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="link"> Logout </Link>
          </li>

        </ul>
      </nav>




      <div class="parent-container">

        <div class="flex-container1">
          <div id="doctor-profiles">
            <div class="body-doctor">
              <div class="profile-img"></div>
              <h1>
                <center> {user.name}</center>
              </h1>
              <div class="details">
                <p>Specialization  : {user.specialization}</p>
                <br />
                Experience        : {user.experience} years
                <br>
                </br><br></br>
                Email    : {user.users.email}
                <br></br><br></br>
                <img class="phoneicon" src={phoneicon} ></img> {user.phoneNumber}
              </div>
              {
                user.status == "approved" ? (<div> You are  approved by Admin</div>) : (<div><p><center>You are yet to be  Approved by Admin</center></p></div>)
              }
            </div>

          </div>
        </div>
        <div class="flex-container2">

          {
            user.status == "approved" ? (<div>
              <div>
                <div className='leave-table'>
                  <center>  <b> Registered Patient Details</b></center>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>DateOfBirth</th>
                        <th>Gender</th>
                        <th>BloodType</th>


                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((item) => (

                        <tr key={item.doctorId}>
                          <td>{item.name}</td>
                          <td>{item.dateOfBirth}</td>
                          <td>{item.gender}</td>

                          <td>{item.bloodType}</td>


                        </tr>

                      ))}
                    </tbody>
                  </table>

                </div>
              </div>


            </div>) : (<div><p><center>You can get the patient details when admin approves you</center></p></div>)
          }
        </div>



      </div>
    </div>

  );
}

export default DoctorProfile;
