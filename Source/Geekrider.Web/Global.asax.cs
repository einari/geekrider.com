using System.Web.Routing;
using Bifrost.Configuration;
using Bifrost.Execution;
using Bifrost.Services.Commands;
using Bifrost.Services.Execution;
using Bifrost.Unity;
using Bifrost.Web.Mvc;
using Geekrider.Services;
using Microsoft.Practices.Unity;

namespace Geekrider
{
    public class Global : BifrostHttpApplication
    {
        public override void OnConfigure(Configure configure)
        {
            //configure.UsingConfigConfigurationSource();
            var mongoDbUrl = System.Configuration.ConfigurationManager.AppSettings["MONGOHQ_URL"];
            configure.UsingMongoDb(mongoDbUrl, "07a538a6-f8a8-43eb-b0e1-adb7ef5e5942"); //Geekrider"); // 07a538a6-f8a8-43eb-b0e1-adb7ef5e5942

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

