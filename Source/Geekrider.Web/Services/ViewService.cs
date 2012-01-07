using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Collections.Generic;
using Bifrost.Entities;
using Bifrost.Events;
using System.ServiceModel.Web;
using Bifrost.Serialization;

namespace Geekrider.Services
{
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    [ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall)]
    public class ViewService
    {
        IEntityContext<EventHolder> _eventRepository;
        ISerializer _serializer;

        public ViewService(IEntityContext<EventHolder> eventRepository, ISerializer serializer)
        {
            _eventRepository = eventRepository;
            _serializer = serializer;
        }


        [WebGet(ResponseFormat=WebMessageFormat.Json)]
        public string GetAll()
        {
            var events = _eventRepository.Entities.ToArray();
            var serialized = _serializer.ToJson(events);
            return serialized;

        }
    }
}