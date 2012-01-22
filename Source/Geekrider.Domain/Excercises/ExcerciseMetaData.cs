using System;
using Bifrost.Domain;

namespace Geekrider.Domain.Excercises
{
    public class ExcerciseMetaData : AggregatedRoot
    {
        public ExcerciseMetaData(Guid id) : base(id) { }
    }
}
