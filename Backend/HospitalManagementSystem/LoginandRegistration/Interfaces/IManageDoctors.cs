using LoginandRegistration.Models.DTO;
using LoginandRegistration.Models;
namespace LoginandRegistration.Interfaces
{
    public interface IManageDoctors
    {

        public Task<UserDTO?> DoctorRegistration(DoctorDTO doctor);
        public Task<StatusDTO> StatusUpdate(StatusDTO status);

        public Task<ICollection<Doctor?>> GetAllDoctorsBasedOnSpecialization(string Specialization);


    }
}
