using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Bifrost.Views;

namespace Geekrider.Views.Excercises
{
    public class Excercise : IHaveId
    {
        public Guid Id { get; set; }

        public ExcerciseType Type { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
