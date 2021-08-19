using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<List<ActivityModel>> GetAllActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActivityModel> GetActivityById(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}