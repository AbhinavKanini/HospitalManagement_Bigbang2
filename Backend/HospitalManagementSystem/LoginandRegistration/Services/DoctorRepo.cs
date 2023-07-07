using Microsoft.Data.SqlClient;
using LoginandRegistration.Models;
using LoginandRegistration.Models.Context;
using Microsoft.EntityFrameworkCore;
using LoginandRegistration.Interfaces;

namespace LoginandRegistration.Services
{
    public class DoctorRepo : IRepo<Doctor,int>
    {
        private readonly UserContext _context;
        private readonly ILogger<User> _logger;

        public DoctorRepo(UserContext context, ILogger<User> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Doctor?> Add(Doctor item)
        {
            try
            {
                _context.Doctors.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Delete(int key)
        {
            try
            {
                var doctor = await Get(key);
                if (doctor != null)
                {
                    _context.Doctors.Remove(doctor);
                    await _context.SaveChangesAsync();
                    return doctor;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Get(int key)
        {
            try
            {
                var doctor = await _context.Doctors.Include(i => i.Users).FirstOrDefaultAsync(i => i.DoctorId == key);
                return doctor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Doctor>>GetAll()
        {
            try
            {
                var doctor = await _context.Doctors.Include(d => d.Users).ToListAsync();
                if (doctor.Count > 0)
                    return doctor;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Doctor?> Update(Doctor item)
        {
            try
            {
                var doctor = _context.Doctors.FirstOrDefault(u => u.DoctorId == item.DoctorId); ;
                if (doctor != null)
                {
                    doctor.Status = item.Status != null ? item.Status : doctor.Status;
                    doctor.Specialization = item.Specialization != null ? item.Specialization : doctor.Specialization;
                    doctor.Experience = item.Experience != null ? item.Experience : doctor.Experience;
                    await _context.SaveChangesAsync();
                    return doctor;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }
    }
}
