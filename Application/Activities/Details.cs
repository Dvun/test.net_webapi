using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityModel>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, ActivityModel>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<ActivityModel> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}