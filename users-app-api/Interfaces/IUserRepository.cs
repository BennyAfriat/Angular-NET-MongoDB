using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using usersappapi.Models;

namespace usersappapi.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUser(string id);
        Task Create(User user);
        Task<bool> Update(User game);
        Task<bool> Delete(string id);
    }
}
