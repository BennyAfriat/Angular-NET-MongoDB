
using System;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using usersappapi.Interfaces;

namespace usersappapi.Models
{
    public class UserContext: IUserContext
    {
        private readonly IMongoDatabase _db;
       

        public UserContext(IOptions<Settings> options)
        {
           var _client = new MongoClient(options.Value.ConnectionString);
            _db = _client.GetDatabase(options.Value.Database);
        }

        public IMongoCollection<User> Users => _db.GetCollection<User>("Users");

       
    }
}
