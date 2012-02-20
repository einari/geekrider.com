(function (undefined) {
	Bifrost.features.featureManager.get("admin/posts/create").defineViewModel(function () {
        var self = this;

        this.createPostCommand = Bifrost.commands.Command.create({
            name: 'CreatePost',
            context: self,
            success: function (command) {
                console.log("Done");
            },
            beforeExecute: function (command) {
            },
            parameters: {
                postId : Bifrost.Guid.create(),
                title: ko.observable(),
                body: ko.observable()
            }
        });
    });
})();