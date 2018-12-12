using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace usersappapi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("FirstName")]
        public string FirstName { get; set; }

        [BsonElement("LastName")]
         public string LastName { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("EMail")]
        public string Email { get; set; }

    }
}
