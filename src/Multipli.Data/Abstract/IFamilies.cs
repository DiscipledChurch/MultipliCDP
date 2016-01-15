using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Multipli.Data.Entities;

namespace Multipli.Data.Abstract
{
    public interface IFamilies
    {
        long InsertFamily(Family family);
    }
}
