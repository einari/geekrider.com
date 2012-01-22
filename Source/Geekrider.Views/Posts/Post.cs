using System;
using Bifrost.Views;

namespace Geekrider.Views.Posts
{
    public class Post : IHaveId
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        public string Body { get; set; }
    }
}
