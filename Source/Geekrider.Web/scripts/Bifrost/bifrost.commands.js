﻿var Bifrost = Bifrost || {};

(function () {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    function guid() {
       return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    function CommandDescriptor(name, commandParameters) {
        this.Name = name;

        var commandContent = {
            Id: guid()
        };

        for( var parameter in commandParameters ) {
            if( typeof(commandParameters[parameter]) == "function")  {
                commandContent[parameter] = commandParameters[parameter]();
            } else {
                commandContent[parameter] = commandParameters[parameter];
            }
        }


        this.Command = JSON.stringify(commandContent);
    };

    function Command() {
        self = this;
        self.hasError = false;
        self.isBusy =  ko.observable();
        self.canExecute = ko.observable(true);

        self.execute = function() {
            self.hasError = false;
            if( self.beforeExecute ) {
                self.beforeExecute(self);
            }

            if( !self.canExecute() ) {
                return;
            }
            self.isBusy(true);

            $.ajax({
                url: "CommandCoordinator/handle", 
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(new CommandDescriptor(self.name, self.parameters)),
                contentType: 'application/json; charset=utf-8',
                error: function(e) {
                    self.hasError = true;
                    self.error = e;

                    if( self.onError != undefined ) {
                        self.onError(self);
                    }
                },
                complete: function() {
                    if( !self.hasError ) {
                        if( self.onSuccess != undefined ) {
                            self.onSuccess(self);
                        }
                    }
                    if( self.onComplete != undefined ) {
                        self.onComplete(self);
                    }
                    self.isBusy(false);
                }
            });
        };
    };

    Bifrost.commands = {
        create: function(configuration) {
            var cmd = new Command();
            $.extend(cmd, configuration);
            return cmd;
        }
    };
})();