import './DoctorProfileCard.css'
import { useState } from 'react';
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import phoneicon from "../Images/phone.png"
const Card = (props) => {
  const navigate = useNavigate();

  const location = useLocation();
  const showButtonOnLinks = ['/managedoctors'];
  const showButton = showButtonOnLinks.includes(location.pathname);
  const [doctorstatus, setdoctorStatus] = useState({
    "doctorId": 0,
    "status": ""
  });


  var changestatus = (doctorData) => {

    fetch('https://localhost:7132/api/Doctor/UpdateDoctorStatus', {
      "method": "POST",

      headers: {
        "accept": "text/plain",
        "Content-Type": 'application/json'
      },
      "body": JSON.stringify(doctorData)

    })
      .then(async (data) => {
        var myData = await data.json();
        console.log(JSON.stringify(doctorstatus))


        console.log(myData.doctorstatus)

      }).catch((err) => {
        console.log(err.error)
      })
  }



  const handleApproval = (name, email) => {
    const parameters = {
      to_name: name,

    }
    emailjs.send("service_ams6xyv","template_6betqpa",{
      to_email: email,
      message: 'Congratulations! You have been approved.',
    }, 'UgzF3mGun7u50STTQ')
      .then(() => {
        console.log('Email sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

  };



  return (
    <div className="card-doctor">
      <div className="card-content">
        <h3 className="card-title">{props.c.name}</h3>
        <p className="small">Specialization: {props.c.specialization}<br />Experience :{props.c.experience}<br /><img class="phoneicon" src={phoneicon}></img> {props.c.phoneNumber} <br /> Email : {props.c.users.email}
        </p>

        {showButton && (

          <>
            <button id="approvebtn" onClick={() => {
              var doctorData = {
                "doctorId": props.c.doctorId,
                "status": "approved"
              };
              console.log(doctorData);
              changestatus(doctorData);
              console.log(props.c.name, props.c.users.email)
              handleApproval(props.c.name, props.c.users.email,);
              alert("Approved")
            }}
              value="approved">Approve</button>

            <button id="disapprovebtn" onClick={() => {
              var doctorData = {
                "doctorId": props.c.doctorId,
                "status": "disapproved"
              };
              console.log(doctorData);
              changestatus(doctorData);
              console.log(props.c.name, props.c.users.email)
              alert("Not Approved")
            }}
              value="approved">DisApprove</button> </>

        )}      </div>

      <div class="go-corner" href="#">
        <div class="go-arrow">
          →
        </div>
      </div>
    </div>
  );
};

export default Card;



