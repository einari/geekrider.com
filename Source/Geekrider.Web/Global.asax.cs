using System.Web.Routing;
using Bifrost.Configuration;
using Bifrost.Execution;
using Bifrost.Services.Commands;
using Bifrost.Services.Execution;
using Bifrost.Web.Mvc;
using Geekrider.Services;
using Microsoft.Practices.Unity;
using Bifrost.Unity;

namespace Geekrider
{
    public class Global : BifrostHttpApplication
    {
        public override void OnConfigure(Configure configure)
        {
            configure.UsingConfigConfigurationSource();

            base.OnConfigure(configure);
        }

        public override void OnStarted()
        {
            RouteTable.Routes.AddService<CommandCoordinatorService>();
            RouteTable.Routes.AddService<ViewService>();
        }

        protected override IContainer CreateContainer()
        {
            var unity = new UnityContainer();
            var container = new Container(unity);
            return container;
        }
    }
}

