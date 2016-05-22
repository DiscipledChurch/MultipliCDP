using System.Collections.Generic;

namespace Multipli.Infrastructure.Storage
{
    public interface IDataProvider
    {
        object Connect();
    }
}