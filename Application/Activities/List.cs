using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using test.net_webapi.Application.Core;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityModel>>> {}

        public class Handler : IRequestHandler<Query, Result<List<ActivityModel>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<ActivityModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<ActivityModel>>.Success(await _context.Activities.ToListAsync(cancellationToken: cancellationToken));
            }
        }
    }
}