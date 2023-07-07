using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.DTO;
using LoginandRegistration.Models;
using System.Security.Cryptography;
using System.Text;
using LoginandRegistration.Models.Context;

namespace LoginandRegistration.Services
{

    public class ManageUserService : IManageUser
    {
        private readonly IRepo<User, int> _userRepo;
        private readonly IRepo<Admin, int> _adminRepo;
        private readonly IRepo<Patient, int> _patientRepo;
        private readonly IRepo<Doctor,int> _doctorRepo;

        private readonly IGenerateToken _tokenService;

        public ManageUserService(
                                 IRepo<User, int> userRepo,
                                 IGenerateToken tokenService, IRepo<Admin, int> adminrepo, IRepo<Patient, int> patientRepo, IRepo<Doctor, int> doctorRepo)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
            _adminRepo = adminrepo;
            _patientRepo = patientRepo;
        }
        public async Task<UserDTO> Login(UserDTO userDTO)
        {
            UserDTO user = null;
            var users = await _userRepo.GetAll();
            var userData = users.FirstOrDefault(u => u.Email == userDTO.Email);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.PasswordKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.PasswordHash[i])
                        return null;
                }
                user = new UserDTO();
                user.UserId = userData.UserId;
                user.Role = userData.Role;
                if (user.Role != "doctor")
                {
                    user.Token =  _tokenService.GenerateToken(user);
                    return user;
                }
                var doctor = await _doctorRepo.Get(user.UserId);
                if (doctor != null && doctor.Status == "Not Approved")
                {
                    return user;
                }
                user.Token = (_tokenService.GenerateToken(user));
                return user;

            }
            return null;



          
        }

        public async Task<UserDTO> AdminRegistration(AdminDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear ?? "1234"));
            user.Users.PasswordKey = hmac.Key;
            user.Users.Role = "Admin";

            var users = await _adminRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.Email == user.Email && u.PhoneNumber == user.PhoneNumber);
                if (myAdminUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(user.Users);
            var adminResult = await _adminRepo.Add(user);
            if (userResult != null && adminResult != null)
            {
                myUser = new UserDTO();
                myUser.UserId = adminResult.AdminId;
                myUser.Role = userResult.Role;
                myUser.Token = _tokenService.GenerateToken(myUser);
            }
            return myUser;
        }

        public async Task<User?> GetByEmail(string email)
        {

            var users = await _userRepo.GetAll();

            var user =  users.FirstOrDefault(u=>u.Email==email);
            if (user != null)
            {
                return user;
            }
            else
            {
                throw new Exception("Database is empty");
            }
        }








    }
}
