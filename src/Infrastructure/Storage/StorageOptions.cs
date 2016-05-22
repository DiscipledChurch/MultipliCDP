using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Multipli.Infrastructure.Storage
{
    public class StorageOptions
    {
        public ProviderType Provider { get; set; }
        public string EndpointUrl { get; set; }
        public string AuthorizationKey { get; set; }
        public string ConnectionString { get; set; }
    }
}
