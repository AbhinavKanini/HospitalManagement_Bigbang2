using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Diagnostics;

namespace LoginandRegistration.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("CORS")]

    public class DoctorController : ControllerBase
    {
        private readonly IManageDoctors _managedoctor;
        private readonly IRepo<Doctor ,int> _doctorrepo;
        public DoctorController( IManageDoctors managedoctor,IRepo<Doctor,int> doctorrepo)
        {
            _managedoctor = managedoctor;
            _doctorrepo = doctorrepo;
        }


        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> RegisterAsDoctor(DoctorDTO doctorDTO)
        {
            try
            {
                var result = await _managedoctor.DoctorRegistration(doctorDTO);
                if (result != null)
                    return Ok(result);
                return BadRequest("Unable to register at this moment");
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                // Handle or log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the request.");
            }

        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<ICollection<Doctor>> FetchAllDoctorsbyspecialization(string specialization)
        {
            try
            {
                var doctors = _managedoctor.GetAllDoctorsBasedOnSpecialization(specialization);
                if (doctors != null)
                {
                    return NotFound("No doctors  available");
                }
                return Ok(doctors);
            }
            catch (SqlException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
            }
            return null;

        }



        [HttpGet]
        [ProducesResponseType(typeof(List<Doctor>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<Doctor>>> GetAllctors()
        {
            try
            {
                var doctors = await _doctorrepo.GetAll();
                if (doctors != null)
                {
                    return Ok(doctors);

                }
                return NotFound("No doctors  available");
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
            }
            return null;

        }
       
        [HttpPost]
        [EnableCors("CORS")]

        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>>UpdateDoctorStatus(StatusDTO statusDTO)
        {
            if (statusDTO != null)
            {
                var result = await _managedoctor.StatusUpdate(statusDTO);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Cannot update Doctor status right now");
            }
            return BadRequest("Enter the credentials properly");
        }



        [HttpPost]
        [ProducesResponseType(typeof(Doctor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Doctor>> UpdateDoctorDetails(Doctor doctor)
        {
            if (doctor != null)
            {
                var result = await _doctorrepo.Update(doctor);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Cannot update Doctor Details right now");
            }
            return BadRequest("Enter the credentials properly");
        }
    }
}
