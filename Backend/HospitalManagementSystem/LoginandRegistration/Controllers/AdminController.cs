using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using LoginandRegistration.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace LoginandRegistration.Controllers
{
   
        [Route("api/[controller]/[action]")]
        [ApiController]
        [EnableCors("CORS")]



    public class AdminController : ControllerBase
        {
            private readonly IManageUser _manageadmin;
            public AdminController(IManageUser manageadmin)
            {
                _manageadmin = manageadmin;


            }


            [HttpPost]
            [ProducesResponseType(typeof(AdminDTO), StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<ActionResult<UserDTO>> RegisterAsAdmin(AdminDTO adminDTO)
            {
            try
            {
                var result = await _manageadmin.AdminRegistration(adminDTO);
                if (result != null)
                    return Ok(result);
                else
                    return BadRequest("Unable to register at this moment");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        
    } }
