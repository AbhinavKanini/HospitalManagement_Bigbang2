using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace LoginandRegistration.Services
{
    public class ManageDoctorService :IManageDoctors
    {
        private readonly IRepo<Doctor, int> _doctorRepo;
        private readonly IRepo<User, int> _userRepo;
        private readonly IGenerateToken _tokenService;

        public ManageDoctorService( IRepo<Doctor, int> doctorRepo, IRepo<User, int> userRepo, IGenerateToken tokenService)
        {

            _doctorRepo = doctorRepo;
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        public async Task<UserDTO> DoctorRegistration(DoctorDTO user)
        {
            UserDTO myUser = null;
            var hmac = new HMACSHA512();
            user.Users.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.PasswordClear));
            user.Users.PasswordKey = hmac.Key;
            user.Users.Role = "Doctor";
            user.Status = "Inactive";

            var users = await _doctorRepo.GetAll();
            if (users != null)
            {
                var myAdminUser = users.FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber && u.Name==user.Name);
                if (myAdminUser != null)
                {
                    return null;
                }
            }
            var userResult = await _userRepo.Add(user.Users);
            var doctorResult = await _doctorRepo.Add(user);
            if (userResult != null && doctorResult != null)
            {
                myUser = new UserDTO();
                myUser.UserId = doctorResult.DoctorId;
                myUser.Role = userResult.Role;
                myUser.Token = _tokenService.GenerateToken(myUser);
            }
            return myUser;
        }
         
        public async Task<StatusDTO> StatusUpdate(StatusDTO status)
        {
            var doctor = await _doctorRepo.Get(status.DoctorId);
            if (doctor != null)
            {
                doctor.Status = status.Status;
                var updateDoctor = await _doctorRepo.Update(doctor);
                if (updateDoctor != null)
                    return status;
                return null;
            }
            return null;
        }


        public async Task<ICollection<Doctor>> GetAllDoctorsBasedOnSpecialization(string specialization)
        {

            var doctor = (await _doctorRepo.GetAll()).Where(s => s.Specialization == specialization).ToList();
            if (doctor != null)
            {
                return doctor;
            }
            return null;
        }




    }
}
