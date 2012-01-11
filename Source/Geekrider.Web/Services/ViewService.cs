using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using Bifrost.Execution;
using Bifrost.Serialization;
using Bifrost.Views;

namespace Geekrider.Services
{
    /*
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.Single)]
    */
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]

    public class ViewService
    {
        ITypeDiscoverer _typeDiscoverer;
        ISerializer _serializer;
        IContainer _container;

        Dictionary<string, Type> _viewTypes = new Dictionary<string, Type>();

        public ViewService(
            ITypeDiscoverer typeDiscoverer, 
            ISerializer serializer, 
            IContainer container)
        {
            _typeDiscoverer = typeDiscoverer;
            _serializer = serializer;
            _container = container;

            PopulateViewTypes();
        }

        void PopulateViewTypes()
        {
            var views = _typeDiscoverer.FindMultiple<IHaveId>();
            foreach (var view in views)
            {
                var viewType = typeof(View<>).MakeGenericType(view);
                _viewTypes[view.Name] = viewType;
            }
        }


        [WebGet(ResponseFormat=WebMessageFormat.Json)]
        public string GetAll(string viewName)
        {
            if (!_viewTypes.ContainsKey(viewName))
                return string.Empty;

            var type = _viewTypes[viewName];
            var view = _container.Get(type);

            var queryProperty = type.GetProperty("Query");
            var queryable = queryProperty.GetValue(view, null) as IQueryable;
            
            var serialized = _serializer.ToJson(queryable);
            return serialized;

        }
    }
}