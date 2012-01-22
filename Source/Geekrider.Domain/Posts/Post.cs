using System;
using Bifrost.Domain;
using Geekrider.Events.Posts;

namespace Geekrider.Domain.Posts
{
    public class Post : AggregatedRoot
    {
        public Post(Guid id) : base(id) { }

        public void Create(string title, string body)
        {
            Apply(new PostCreated(Id)
            {
                Title = title,
                Body = body
            });
        }
    }
}
