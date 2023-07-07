using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LoginandRegistration.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("CORS")]

    public class RegistrationController : ControllerBase
    {
        private readonly IManageUser _manageUser;
        private readonly IManageDoctors _managedoctor;



        public RegistrationController(IManageUser manageUser,IManageDoctors managedoctor)
        {
            _manageUser = manageUser;
            _managedoctor = managedoctor;
        }




        [HttpPost("Login")]
        [ProducesResponseType(typeof(UserDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDTO>> Login(UserDTO userDTO)
        {
            var result = await _manageUser.Login(userDTO);
            if (result != null)
                return Ok(result);
            return BadRequest("Invalid credentials");

        }

      
    }
}
