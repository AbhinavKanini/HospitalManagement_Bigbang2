using LoginandRegistration.Models;
using LoginandRegistration.Interfaces;
using LoginandRegistration.Models.Context;
using Microsoft.EntityFrameworkCore;

namespace LoginandRegistration.Services
{
    public class PatientRepo : IRepo<Patient,int>
    {
        private readonly UserContext _context;
        private readonly ILogger<User> _logger;

        public PatientRepo(UserContext context, ILogger<User> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Patient?> Add(Patient item)
        {
            try
            {
                _context.Patients.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Delete(int key)
        {
            try
            {
                var patient = await Get(key);
                if (patient != null)
                {
                    _context.Patients.Remove(patient);
                    await _context.SaveChangesAsync();
                    return patient;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Get(int key)
        {
            try
            {
                var patient = await _context.Patients.Include(i => i.Users).FirstOrDefaultAsync(i => i.PatientId == key);
                return patient;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Patient>?> GetAll()
        {
            try
            {
                var patient = await _context.Patients.ToListAsync();
                if (patient.Count > 0)
                    return patient;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<Patient?> Update(Patient item)
        {
            try
            {
                var patient = _context.Patients.FirstOrDefault(u => u.PatientId == item.PatientId); ;
                if (patient != null)
                {
                    patient.PhoneNumber = item.PhoneNumber != null ? item.PhoneNumber : patient.PhoneNumber;

                    await _context.SaveChangesAsync();
                    return patient;
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
