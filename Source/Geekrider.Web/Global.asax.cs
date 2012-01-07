using System.Web.Routing;
using Bifrost.Configuration;
using Bifrost.Execution;
using Bifrost.Ninject;
using Bifrost.WCF.Commands;
using Bifrost.WCF.Execution;
using Bifrost.Web.Mvc;
using Ninject;
using Geekrider.Services;

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
            var kernel = new StandardKernel();
            var container = new Container(kernel);
            return container;
        }
    }
}

