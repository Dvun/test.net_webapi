using FluentValidation;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Activities
{
    public class ActivityValidator : AbstractValidator<ActivityModel>
    {
        public ActivityValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Venue).NotEmpty();
        }
    }
}