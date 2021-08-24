using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MediatR;
using test.net_webapi.Application.Core;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ActivityModel ActivityModel { get; set; }
        }
        
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.ActivityModel).SetValidator(new ActivityValidator());
            }
        }
        
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var  activity = await _context.Activities.FindAsync(request.ActivityModel.Id);
                if (activity == null) return null;
                _mapper.Map(request.ActivityModel, activity);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update activity!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}