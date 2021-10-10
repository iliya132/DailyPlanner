using DailyPlanner.Common.Interfaces;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

using System;
using System.Web.Mvc;

using Controller = Microsoft.AspNetCore.Mvc.Controller;

namespace DailyPlanner.Controllers.Base
{
    public abstract class BaseDailyPlannercontroller : Controller
    {
        private readonly IDailyPlannerDataProvider provider;
        private readonly UserManager<IdentityUser<Guid>> userManager;
        protected readonly ILogger<BaseDailyPlannercontroller> logger;

        public BaseDailyPlannercontroller()
        {
            provider = DependencyResolver.Current.GetService<IDailyPlannerDataProvider>();
            userManager = DependencyResolver.Current.GetService<UserManager<IdentityUser<Guid>>>();
            logger = DependencyResolver.Current.GetService<ILogger<BaseDailyPlannercontroller>>();
        }

        protected IInterface DataProvider<IInterface>() where IInterface:class
        {
            return provider.GetProvider<IInterface>();
        }

        protected Guid GetUserId()
        {
            return new Guid(userManager.GetUserId(HttpContext.User));
        }
    }
}
