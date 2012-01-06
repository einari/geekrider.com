var Bifrost = Bifrost || {};

(function ($) {
	function ViewModel(definition, isSingleton) {
		var self = this;
		
		self.definition = definition;
		self.isSingleton = isSingleton;
		
		self.getInstance = function() {
			if( isSingleton ) {
				if( !self.instance ) {
					self.instance = new self.definition();
				}
				return self.instance;
			}
			
			return new self.definition();
		}
	}
	
	function Feature(name) {
		var self = this;
		self.name = name;

		self.load = function(loaded) {
			var path = "../Features/"+self.name;
			var view = "text!"+path+"/view.html!strip";
			//var styles = "text!"+path+"/views.css";
			var viewModelPath = path+"/viewModel";

//			require([view, styles, viewModelPath], function(v,s) {
			require([view, viewModelPath], function(v) {
				self.view = v;
				//self.stylesheet = s;
			
				if( loaded ) {
					loaded(self);
				}
			});
		}
		
		self.defineViewModel = function(viewModel, isSingleton) {
			self.viewModel = new ViewModel(viewModel, isSingleton);
		}
		
		self.renderTo = function(target) {
			$(target).append(self.view);
			var viewModel = self.viewModel.getInstance();
			ko.applyBindings(viewModel, target);
		}
	}

	Bifrost.Features = {
		add: function(name, loaded) {
			var feature = new Feature(name, loaded);
			Bifrost.Features[name] = feature;
			feature.load(loaded);
		}
	};

	
	$(function() {
		$("*[data-feature]").each(function() {
			var target = $(this);
			var feature = $(this).attr("data-feature");
			
			Bifrost.Features.add(feature, function(feature) {
				feature.renderTo(target[0]);
			});
		});
	});
})(jQuery);


