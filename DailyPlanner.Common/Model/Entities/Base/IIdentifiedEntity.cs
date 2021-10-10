using System;

namespace DailyPlanner.Common.Model.Entities.Base
{
    public  interface IIdentifiedEntity
    {
        public Guid Id { get; set; }
    }
}
