using LoginandRegistration.Interfaces;
using LoginandRegistration.Models;
using LoginandRegistration.Models.Context;
using Microsoft.EntityFrameworkCore;

namespace LoginandRegistration.Services
{
    public class AdminRepo : IRepo<Admin ,int>
    {
        private readonly UserContext _context;
        private readonly ILogger<UserRepo> _logger;
       

        public AdminRepo(UserContext hospitalContext, ILogger<UserRepo> logger)
        {
            _context = hospitalContext;
            _logger = logger;

        }

        public async Task<Admin?> Add(Admin item)
        {
            try
            {
                _context.Admins.Add(item);
                await _context.SaveChangesAsync();
                return item;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public Task<Admin?> Delete(int key)
        {
            throw new NotImplementedException();
        }

        public async Task<Admin?> Get(int key)
        {
            try
            {
                var user = await _context.Admins.FirstOrDefaultAsync(u => u.AdminId == key);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public async Task<ICollection<Admin>?> GetAll()
        {
            try
            {
                var users = await _context.Admins.ToListAsync();
                if (users.Count > 0)
                    return users;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return null;
        }

        public Task<Admin?> Update(Admin item)
        {
            throw new NotImplementedException();
        }
    }
}
