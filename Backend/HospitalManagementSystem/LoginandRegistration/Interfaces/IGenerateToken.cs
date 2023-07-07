using LoginandRegistration.Models.DTO;

namespace LoginandRegistration.Interfaces
{
    public interface IGenerateToken


    {
        public string GenerateToken(UserDTO user);

    }
}
