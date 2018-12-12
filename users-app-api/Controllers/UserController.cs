using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using usersappapi.Interfaces;
using usersappapi.Models;

namespace usersappapi.Controllers
{

    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {

        public readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _userRepository.GetAllUsers());
        }

        // GET: api/User/id
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(string id)
        {
            var user = await _userRepository.GetUser(id);
            if (user == null)
                return new NotFoundResult();
            return new ObjectResult(user);
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]User user)
        {
            await _userRepository.Create(user);
            return new OkObjectResult(user);
        }

        // PUT: api/User/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]User user)
        {
            var userFromDb = await _userRepository.GetUser(user.Id);
            if (userFromDb == null)
                return new NotFoundResult();
            user.Id = userFromDb.Id;
            await _userRepository.Update(user);
            return new OkObjectResult(user);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userFromDb = await _userRepository.GetUser(id);
            if (userFromDb == null)
                return new NotFoundResult();
            await _userRepository.Delete(id);
            return new OkResult();
        }

    }
}
