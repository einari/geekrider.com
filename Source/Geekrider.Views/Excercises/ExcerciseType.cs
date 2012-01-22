using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Bifrost.Views;

namespace Geekrider.Views.Excercises
{
    public class ExcerciseType : IHaveId
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
    }
}
