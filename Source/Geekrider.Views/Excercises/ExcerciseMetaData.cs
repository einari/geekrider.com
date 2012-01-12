using System;
using Bifrost.Views;

namespace Geekrider.Views.Excercises
{
    public class ExcerciseMetaData : IHaveId
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
