using System.ComponentModel.DataAnnotations;

namespace LoginandRegistration.Models.DTO
{
    public class StatusDTO
    {


        [Required]
        public int DoctorId { get; set; }

        [Required]
        public string? Status { get; set; }
    
}
}
