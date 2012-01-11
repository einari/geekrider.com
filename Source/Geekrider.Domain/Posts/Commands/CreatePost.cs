using System;
using Bifrost.Commands;

namespace Geekrider.Domain.Posts.Commands
{
    public class CreatePost : Command
    {
        public Guid PostId { get; set; }

        public string Title { get; set; }
        public string Body { get; set; }
    }
}
