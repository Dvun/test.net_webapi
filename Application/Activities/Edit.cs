using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public ActivityModel ActivityModel { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var  activity = await _context.Activities.FindAsync(request.ActivityModel.Id);
                _mapper.Map(request.ActivityModel, activity);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}