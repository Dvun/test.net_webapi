using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using test.net_webapi.Application.Core;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Result<ActivityModel>>
        {
            public Guid Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Query, Result<ActivityModel>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<ActivityModel>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);
                return Result<ActivityModel>.Success(activity);
            }
        }
    }
}