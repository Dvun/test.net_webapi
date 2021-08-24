using System.Data;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using test.net_webapi.Application.Core;
using test.net_webapi.Context;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class Create
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.ActivityModel);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create activity!");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}