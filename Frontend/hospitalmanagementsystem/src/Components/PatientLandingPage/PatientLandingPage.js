import React from "react";
import { useEffect,useState } from "react";
import './PatientLandingPage.css'
import profile from '../Images/doctor.png';

function PatientLandingPage(){

    const [doctor, SetactiveDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState(0);
const [filteredResults, setFilteredResults] = useState([]);



    const GetAllDoctors= async () => {
        try {
          const response = await fetch('https://localhost:7132/api/Doctor/GetAllctors');
          const data = await response.json();
          const active = data.filter(user => user.status=="approved");
          SetactiveDoctors(active);
          var filtered = active.filter((item) => item.experience>=searchQuery);
          setFilteredResults(filtered);


        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      useEffect(() => {
        GetAllDoctors();
      }, [searchQuery]);
     
    
    return(
      
      <div>
       
  
      <nav className="navbar">
      <div className="navbar-logo">
       
        <a href="/">Apollo Hospital</a>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <a href="/">Logout</a>
        </li>
       
      </ul>
    </nav> 

 
<div className="row rowss">
    <div className="searchbox">
      <br></br>
    <input
      type="text"
      placeholder="Search by experience"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  
  </div>
  <div className="row">
            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Phone NUmber</th>
                  <th>Email</th>


                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item) => (

                  <tr key={item.doctorId}>
                    <td>{item.name}</td>
                    <td>{item.specialization}</td>
                    <td>{item.experience}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.users.email}</td>

                  </tr>

                ))}
              </tbody>
            </table>
            </div>

          </div>
          </div>
        
        
    )




}
export default PatientLandingPage;