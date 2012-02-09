var Bifrost = Bifrost || {};
(function(global, undefined) {
    Bifrost.namespace = function (ns) {
        var parent = global;
        var parts = ns.split('.');
        $.each(parts, function (index, part) {
            if (!parent.hasOwnProperty(part)) {
                parent[part] = {};
            }
            parent = parent[part];
        });
    };
})(window);
﻿Bifrost.namespace("Bifrost");
Bifrost.extend = function extend(destination, source) {
    var toString = Object.prototype.toString,
			            objTest = toString.call({});
    for (var property in source) {
        if (source[property] && objTest == toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

﻿Bifrost.namespace("Bifrost");
Bifrost.Guid = (function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return {
        create: function () {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()); ;
        }
    }
})(); 
﻿if (typeof ko !== 'undefined') {
    ko.bindingHandlers.command = {
        init: function (element, valueAccessor, allBindingAccessor, viewModel) {
            ko.applyBindingsToNode(element, { click: valueAccessor().execute }, viewModel);
        }
    };
}
﻿Bifrost.namespace("Bifrost.commands");
Bifrost.commands.Command = (function () {
    function Command(options) {
        var self = this;
        this.name = options.name;
        this.hasError = false;
        this.isBusy = ko.observable();
        this.canExecute = ko.observable(true);
        this.id = Bifrost.Guid.create();
        this.options = {
            beforeExecute: function () {
            },
            error: function () {
            },
            success: function () {
            }
        };
        // Todo: add an overrideWith or similar that will always pick the one that is not undefined!
        // add validation check for "type" based on source, if not function for instance in the merger
        // exception!
        Bifrost.extend(this.options, options);

        this.initialize = function () {
            if (typeof self.viewModel === "undefined") {
                self.viewModel = window;
            }
        }

        this.execute = function () {
            self.hasError = false;

            self.onBeforeExecute();

            if (!self.canExecute.call(self.viewModel)) {
                return;
            }
            self.isBusy(true);

            Bifrost.commands.commandCoordinator.handle(self, {
                error: function (e) {
                    self.onError(e);
                },
                complete: function () {
                    self.onComplete();
                }
            });
        }

        this.onBeforeExecute = function () {
            self.options.beforeExecute.call(self.viewModel, self);
        }

        this.onError = function (e) {
            self.hasError = true;
            self.options.error.call(self.viewModel);
        }

        this.onComplete = function () {
            if (!self.hasError) {
                self.options.success.call(self.viewModel);
            }
            self.isBusy(false);
        }
    }

    return {
        create: function (options) {
            var command = new Command(options);
            command.initialize();
            return command;
        }
    }
})();

﻿Bifrost.namespace("Bifrost.commands");
Bifrost.commands.CommandDescriptor = (function () {
    function CommandDescriptor(name, id, commandParameters) {
        this.Name = name;

        var commandContent = {
            Id: id
        };

        for (var parameter in commandParameters) {
            if (typeof (commandParameters[parameter]) == "function") {
                commandContent[parameter] = commandParameters[parameter]();
            } else {
                commandContent[parameter] = commandParameters[parameter];
            }
        }

        this.Command = JSON.stringify(commandContent);
    };

    return {
        createFrom: function (command) {
            var commandDescriptor = new CommandDescriptor(command.name, command.id, command.parameters);
            return commandDescriptor;
        }
    }
})();

﻿Bifrost.namespace("Bifrost.commands");
Bifrost.commands.commandCoordinator = (function () {
    var baseUrl = "/CommandCoordinator";
    return {
        handle: function (command, options) {
            var methodParameters = {
                commandDescriptor: JSON.stringify(Bifrost.commands.CommandDescriptor.createFrom(command))
            };

            $.ajax({
                url: baseUrl + "/Handle",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(methodParameters),
                contentType: 'application/json; charset=utf-8',
                error: function (e) {
                    if (typeof options.error === "function") {
                        options.error(e);
                    }
                },
                complete: function (e) {
                    if (typeof options.complete === "function") {
                        options.complete(e);
                    }
                }
            });
        },
        handleForSaga: function (saga, commands, options) {
            var commandDescriptors = [];
            $.each(commands, function (index, command) {
                command.onBeforeExecute();
                commandDescriptors.push(Bifrost.commands.CommandDescriptor.createFrom(command));
            });

            var methodParameters = {
                sagaId: "\"" + saga.id + "\"",
                commandDescriptors: JSON.stringify(commandDescriptors)
            }

            $.ajax({
                url: baseUrl + "/HandleForSaga",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(methodParameters),
                contentType: 'application/json; charset=utf-8',
                error: function (e) {
                    if (typeof options.error === "function") {
                        options.error(e);
                    }
                },
                complete: function (e) {
                    if (typeof options.complete === "function") {
                        options.complete(e);
                    }
                }
            });
        }
    }
})();

﻿Bifrost.namespace("Bifrost.sagas");
Bifrost.sagas.Saga = (function () {
    function Saga() {
        var self = this;

        this.executeCommands = function (commands) {
            Bifrost.commands.commandCoordinator.handleForSaga(self, commands, {
                error: function (e) {
                },
                complete: function (e) {
                }
            });
        }
    }

    return {
        create: function (configuration) {
            var saga = new Saga();
            Bifrost.extend(saga, configuration);
            return saga;
        }
    }
})();

﻿Bifrost.namespace("Bifrost.sagas");
Bifrost.sagas.sagaNarrator = (function () {
    return {
        conclude: function (saga) {
        }
    }
})();

﻿Bifrost.namespace("Bifrost.features");
Bifrost.features.UriMapping = (function () {
    function throwIfNotString(input, message) {
        if( typeof input !== "string" ) {
            throw {
                name: "ArgumentError",
                message: message
            }
        }
    }

    function UriMapping(uri, mappedUri, isDefault) {
        throwIfNotString(uri, "Missing uri for UriMapping");
        throwIfNotString(mappedUri, "Missing mappedUri for UriMapping");

        var uriComponentRegex = /\{[a-zA-Z]*\}/g
        var components = uri.match(uriComponentRegex) || [];
        var uriRegex = new RegExp(uri.replace(uriComponentRegex, "([\\w.]*)"));

        this.uri = uri;
        this.mappedUri = mappedUri;
        this.isDefault = isDefault || false;

        this.matches = function (uri) {
            var match = uri.match(uriRegex);
            if (match) {
                return true;
            }
            return false;
        }

        this.resolve = function (uri) {
            var match = uri.match(uriRegex);
            var result = mappedUri;
            $.each(components, function (i, c) {
                result = result.replace(c, match[i + 1]);
            });

            return result;
        }
    }

    return {
        create: function (uri, mappedUri, isDefault) {
            var uriMapping = new UriMapping(uri, mappedUri, isDefault);
            return uriMapping;
        }
    }
})();

﻿Bifrost.namespace("Bifrost.features");
Bifrost.features.uriMapper = (function () {
    var mappings = new Array();

    return {
        clear: function () {
            mappings = new Array();
        },

        add: function (uri, mappedUri, isDefault) {
            var uriMapping = Bifrost.features.UriMapping.create(uri, mappedUri, isDefault);
            mappings.push(uriMapping);
        },

        getUriMappingFor: function (uri) {
            var found;
            $.each(mappings, function (i, m) {
                if (m.matches(uri)) {
                    found = m;
                    return false;
                }
            });

            if (typeof found !== "undefined") {
                return found;
            }

            throw {
                name: "ArgumentError",
                message: "URI (" + uri + ") could not be mapped"
            }
        },

        resolve: function (uri) {
            try {
                var uriMapping = Bifrost.features.uriMapper.getUriMappingFor(uri);
                return uriMapping.resolve(uri);
            } catch (e) {
                return "";
            }
        },

        allMappings: function () {
            var allMappings = new Array();
            allMappings = allMappings.concat(mappings);
            return allMappings;
        }
    }
})();
﻿Bifrost.namespace("Bifrost.features");
Bifrost.features.ViewModel = (function () {
    function ViewModel(definition, isSingleton) {
        var self = this;
        this.definition = definition;
        this.isSingleton = isSingleton;

        this.getInstance = function () {

            if (self.isSingleton) {
                if (!self.instance) {
                    self.instance = new self.definition();
                }

                return self.instance;
            }

            return new self.definition();
        };
    }

    return {
        create: function (definition, isSingleton) {
            var viewModel = new ViewModel(definition, isSingleton);
            return viewModel;
        }
    }
})();
﻿Bifrost.namespace("Bifrost.features");
Bifrost.features.Feature = (function () {
    function Feature(name, path, isDefault) {
        var self = this;
        this.loaded = false;
        this.renderTargets = [];
        this.name = name;
        this.path = path;
        this.isDefault = isDefault;

        if (isDefault) {
            this.viewPath = path + "/view.html";
            this.viewModelpath = path + "/viewModel.js";
        } else {
            this.viewPath = path + ".html";
            this.viewModelpath = path + ".js";
        }

        this.load = function () {
            var actualViewPath = "text!" + self.viewPath + "!strip";
            var actualViewModelPath = self.viewModelpath;

            require([actualViewPath, actualViewModelPath], function (v) {
                self.view = v;

                $.each(self.renderTargets, function (i, r) {
                    self.actualRenderTo(r);
                });

                self.renderTargets = [];

                self.loaded = true;
            });
        }

        this.defineViewModel = function (viewModel, isSingleton) {
            self.viewModel = Bifrost.features.ViewModel.create(viewModel, isSingleton);
        }

        this.renderTo = function (target) {
            if (self.loaded === false) {
                self.renderTargets.push(target);
            } else {
                self.actualRenderTo(target);
            }
        }

        this.actualRenderTo = function (target) {
            $(target).append(self.view);
            var viewModel = self.viewModel.getInstance();
            ko.applyBindings(viewModel, target);
        }
    }

    return {
        create: function (name, path, isDefault) {
            var feature = new Feature(name, path, isDefault);
            feature.load();
            return feature;
        }
    }
})();

﻿Bifrost.namespace("Bifrost.features");
Bifrost.features.featureManager = (function () {
    var allFeatures = {};

    return {
        get: function (name) {
            name = name.toLowerCase();

            if (typeof allFeatures[name] !== "undefined") {
                return allFeatures[name];
            }

            var uriMapping = Bifrost.features.uriMapper.getUriMappingFor(name);
            var path = uriMapping.resolve(name);
            var feature = Bifrost.features.Feature.create(name, path, uriMapping.isDefault);
            allFeatures[name] = feature;
            return feature;
        },
        all: function () {
            return allFeatures;
        }
    }
})();
(function ($) {
    $(function () {
        $("*[data-feature]").each(function () {
            var target = $(this);
            var name = $(this).attr("data-feature");
            var feature = Bifrost.features.featureManager.get(name);
            feature.renderTo(target[0]);
        });
    });
})(jQuery);



/*
@depends utils/namespace.js
@depends utils/extend.js
@depends utils/guid.js
@depends Commands/bindingHandlers.js
@depends Commands/Command.js
@depends Commands/CommandDescriptor.js
@depends Commands/commandCoordinator.js
@depends Sagas/Saga.js
@depends Sagas/sagaNarrator.js
@depends Features/UriMapping.js
@depends Features/uriMapper.js
@depends Features/ViewModel.js
@depends Features/Feature.js
@depends Features/featureManager.js
@depends Features/loader.js
*/
