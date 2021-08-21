using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using test.net_webapi.Application.Activities;
using test.net_webapi.Models;

namespace test.net_webapi.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet]
        public async Task<List<ActivityModel>> GetAllActivities(CancellationToken cancellationToken)
        {
            return await Mediator.Send(new List.Query(), cancellationToken);
        }

        
        [HttpGet("{id}")]
        public async Task<ActivityModel> GetActivityById(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(ActivityModel activityModel)
        {
            return Ok(await Mediator.Send(new Create.Command {ActivityModel = activityModel}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, ActivityModel activityModel)
        {
            activityModel.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{ActivityModel = activityModel}));
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}