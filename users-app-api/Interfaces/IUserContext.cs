using System;
using MongoDB.Driver;
using usersappapi.Models;

namespace usersappapi.Interfaces
{
    public interface IUserContext
    {
        IMongoCollection<User> Users { get; }
    }
}
