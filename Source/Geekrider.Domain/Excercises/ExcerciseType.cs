using System;
using Bifrost.Domain;
using Geekrider.Events.ExcerciseTypes;

namespace Geekrider.Domain.Excercises
{
    public class ExcerciseType : AggregatedRoot
    {
        public ExcerciseType(Guid id)
            : base(id)
        {
        }

        public void SetDetails(string title, string description)
        {
            Apply(new DetailsSet(Id));
        }
    }
}
