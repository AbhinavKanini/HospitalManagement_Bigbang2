import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from '../src/Components/Main/Main';
import Login from '../src/Components/LoginandSignUp/login';
import AdminLandingPage from './Components/Admin/Landingpage';
import ManageDoctors from './Components/ManageDoctors/ManageDoctors';
import LandingPage from './Components/Admin/Landingpage'; 
import PatientLandingPage from './Components/PatientLandingPage/PatientLandingPage';
import Register from './Components/Register/Register';
import DoctorProfile from './Components/DoctorLandingPage/doctorlandingpage';
import LandingPageProtectedRoute from './Components/Admin/LandingPageProtectedRoute';
import 'bootstrap/dist/css/bootstrap.css'
import Home from './Components/Home/Home';
import ManageDoctorsPR from './Components/ManageDoctors/ManageDoctors';
import DoctorLandingPagePR from './Components/DoctorLandingPage/DoctorLandingPagePR';
function App() {
  var token;
  return (
    <div>
    <BrowserRouter>



     <Routes>
    <Route path='/' element={<Login/>}/>
      <Route
            path="/landingPage"
            element={
              <LandingPageProtectedRoute token={token}>
                <LandingPage />
              </LandingPageProtectedRoute>
            }
          />

<Route
            path="/managedoctors"
            element={
              <ManageDoctorsPR token={token}>
                <ManageDoctors />
              </ManageDoctorsPR>
            }
          />
      <Route path='/patientlandingpage' element={<PatientLandingPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
      <Route
            path="/doctorlandingpage"
            element={
              <DoctorLandingPagePR token={token}>
                <DoctorProfile />
              </DoctorLandingPagePR>
            }
          />

      <Route path='/doctorprofile' element={<DoctorProfile/>}></Route> 


      


   </Routes> 
     
   </BrowserRouter>


   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</div>
  );
}

export default App;
