using LoginandRegistration.Models.DTO;

namespace LoginandRegistration.Interfaces
{
    public interface IManageUser
    {
        public Task<UserDTO?> Login(UserDTO user);
        public Task<UserDTO?> AdminRegistration(AdminDTO adminDTO);






    }
}
