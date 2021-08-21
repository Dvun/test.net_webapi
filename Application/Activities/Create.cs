﻿using System.Threading;
using System.Threading.Tasks;
using MediatR;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public ActivityModel ActivityModel { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.ActivityModel);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}