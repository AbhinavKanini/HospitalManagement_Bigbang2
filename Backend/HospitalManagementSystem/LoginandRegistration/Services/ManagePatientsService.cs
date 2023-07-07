using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using System.Security.Cryptography;
using System.Text;

namespace LoginandRegistration.Services
{
    public class ManagePatientsService:IManagePatients
    {

        private readonly IRepo<Patient, int> _patientRepo;
        private readonly IRepo<User, int> _userRepo;
        private readonly IGenerateToken _tokenService;
        private readonly IRepo<Doctor,int> _doctorRepo;

        public ManagePatientsService(IRepo<Patient, int> patientRepo, IRepo<User, int> userRepo, IGenerateToken tokenService, IRepo<Doctor, int> doctorRepo)
        {

            _patientRepo = patientRepo;
            _userRepo = userRepo;
            _tokenService = tokenService;
            _doctorRepo = doctorRepo;
        }

        public async Task<UserDTO> PatientRegistration(PatientDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear ?? "1234"));
            user.Users.PasswordKey = hmac.Key;
            user.Users.Role = "patient";

            var users = await _patientRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.Name == user.Name && u.PhoneNumber == user.PhoneNumber);
                if (myAdminUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(user.Users);
            var patientResult = await _patientRepo.Add(user);
            if (userResult != null && patientResult != null)
            {
                myUser = new UserDTO();
                myUser.UserId = patientResult.PatientId;
                myUser.Role = userResult.Role;
                myUser.Token = _tokenService.GenerateToken(myUser);
            }
            return myUser;
        }




    }
}
