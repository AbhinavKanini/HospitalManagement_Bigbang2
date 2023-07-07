using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.DTO;
using LoginandRegistration.Models;

using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Microsoft.AspNetCore.Cors;
using LoginandRegistration.Services;
using Microsoft.AspNetCore.Authorization;

namespace LoginandRegistration.Controllers
{
  

        [Route("api/[controller]/[action]")]
        [ApiController]
        [EnableCors("CORS")]

    public class PatientController : ControllerBase
        {
            private readonly IManagePatients _managepatients;
            private readonly IRepo<Patient, int> _repo;

            public PatientController(IManagePatients managepatients, IRepo<Patient, int> repo)
        {
            _managepatients = managepatients;
            _repo = repo;
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<UserDTO>> RegisterAsPatient(PatientDTO patientDTO)
        {
            var result = await _managepatients.PatientRegistration(patientDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Unable to register at this moment");
        }



        [HttpGet]
      
        [ProducesResponseType(typeof(List<Patient>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ICollection<Patient>>> GetAllPatients()
        {
            try
            {
                var patients = await _repo.GetAll();
                if (patients != null)
                {
                    return Ok(patients);

                }
                return NotFound("No patients  available");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }




    }
}
