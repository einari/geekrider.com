(function (undefined) {
    function viewModel() {
        var self = this;

        this.createPostCommand = Bifrost.commands.create({
            name: 'CreatePost',
            context: self,
            onSuccess: function (command) {
                command.context.message("We got it");
            },

            beforeExecute: function (command) {
            },
            parameters: {
                postId : guid(),
                title: ko.observable(),
                body: ko.observable()
            }
        });
    }



    if (Bifrost.features.posts != undefined) {
        Bifrost.features.posts.create.defineViewModel(viewModel);
    } else {
        $(function () {
            ko.applyBindings(new viewModel());
        });
    }
})();