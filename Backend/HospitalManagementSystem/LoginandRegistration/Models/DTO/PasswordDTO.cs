using System.ComponentModel.DataAnnotations;

namespace LoginandRegistration.Models.DTO
{
    public class PasswordDTO 
    {


        [Required]
        public int UserID { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
