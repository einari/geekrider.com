using System;
using Bifrost.Commands;

namespace Geekrider.Domain.Excercises.Commands
{
    public class CreateExcerciseType : Command
    {
        public Guid ExcerciseTypeId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
