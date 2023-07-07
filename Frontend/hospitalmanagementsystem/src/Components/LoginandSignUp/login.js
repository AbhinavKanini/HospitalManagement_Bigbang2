import React, { useState } from 'react';
import { useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    "userId": 0,
    "email": "",
    "password": "",
    "role": "",
    "token": ""
  })
  const [errors, setErrors] = useState({});
  var [error, seterror] = useState(null);


  var changeUserId = (event) => {
    setDetails({ ...details, "email": event.target.value })
    setErrors({ ...errors, email: '' });

  }

  var changeUserPassword = (event) => {
    setDetails({ ...details, "password": event.target.value })
    setErrors({ ...errors, password: '' });

  }


  var submitThis = () => {

    fetch('https://localhost:7132/api/Registration/Login/Login', {
      "method": "POST",
      headers: {
        "accept": "text/plain",
        "Content-Type": 'application/json'
      },
      "body": JSON.stringify({ ...details, "details": {} })
    })
      .then(async (data) => {
        if (data.status == 400) {
          // alert("invalid credentials")
          seterror("invalid")
          console.log("error");
        }
        var myData = await data.json();
        localStorage.setItem('token', myData.token)
        if (myData.role.toLowerCase() === 'admin') {
          localStorage.setItem('email', details.email);
          navigate('/landingPage');
        } else if (myData.role.toLowerCase() === 'patient') {
          navigate('/patientlandingpage');
        } else if (myData.role.toLowerCase() === 'doctor') {
          localStorage.setItem('userId', myData.userId);
          navigate('/doctorlandingpage');
        }
        sessionStorage.setItem('role', myData.role)

        console.log(myData)
      }).catch((err) => {
        console.log(err.error)
      })

  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) removingLocalStorage()
    return () => { ignore = true; }
  }, []);


  var removingLocalStorage = () => {
    localStorage.clear("token");
    localStorage.clear("role");
    localStorage.clear("userId");



  }

  return (
    <div className='body-login'>
      <div className='container-login'>
        <div className='con2'>
          <h1>Welcome To  Apollo Hospitals</h1>
          <p>
            Please log in to access your account
            <br />
            If you don't have account yet, You can register here
          </p>

        </div>
        <div className='con'>

          <center><h2>Login</h2></center>
          <div className='fld'>

            <label For="email">User Id or Email</label>
            <input type="text" name="email" id="email" placeholder='user id' onChange={changeUserId} />

          </div>
          <div className='fld' style={{ marginTop: "10px" }}>
            <label for="passw">Password</label>
            <input name="passw" id="passw" placeholder='password' onChange={changeUserPassword} />
          </div>
          {error != null && <div className='alerts'>*invalid credentials</div>

          }
          <button type="submit" onClick={submitThis}>Login</button>

          <div className='registeras'>
            <p>  Dont have an account?</p><br>
            </br>
            <Link to="/register" className="link" onClick={() => { localStorage.setItem("role", "doctor") }}>Register as a doctor </Link> or
            <Link to="/register" className="link" onClick={() => { localStorage.setItem("role", "patient") }}> Patient </Link>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Login;
