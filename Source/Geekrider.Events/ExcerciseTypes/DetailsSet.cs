using System;
using Bifrost.Events;

namespace Geekrider.Events.ExcerciseTypes
{
    public class DetailsSet : Event
    {
        public DetailsSet(Guid eventSourceId) : base(eventSourceId) { }

        public string Title { get; set; }
        public string Description { get; set; }
    }
}
