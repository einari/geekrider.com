using Bifrost.Commands;
using Bifrost.Domain;

namespace Geekrider.Domain.Posts.Commands
{
    public class PostCommandHandlers : ICommandHandler
    {
        IAggregatedRootRepository<Post> _aggregatedRootRepository;

        public PostCommandHandlers(IAggregatedRootRepository<Post> aggregatedRootRepository)
        {
            _aggregatedRootRepository = aggregatedRootRepository;
        }

        public void Handle(CreatePost createPost)
        {
            var post = _aggregatedRootRepository.Get(createPost.PostId);
            post.Create(createPost.Title, createPost.Body);
        }
    }
}
