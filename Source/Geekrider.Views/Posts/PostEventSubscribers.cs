using Bifrost.Events;
using Geekrider.Events.Posts;

namespace Geekrider.Views.Posts
{
    public class PostEventSubscribers : EventSubscriber<Post>
    {
        void Process(PostCreated created)
        {
            var post = new Post
            {
                Id = created.EventSourceId,
                Title = created.Title,
                Body = created.Body
            };
            InsertEntity(post);
        }
    }
}
