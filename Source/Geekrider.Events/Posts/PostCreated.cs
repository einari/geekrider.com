using System;
using Bifrost.Events;

namespace Geekrider.Events.Posts
{
    public class PostCreated : Event
    {
        public PostCreated(Guid eventSourceId) : base(eventSourceId) { }

        public string Title { get; set; }
        public string Body { get; set; }
    }
}
