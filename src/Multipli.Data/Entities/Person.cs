using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Multipli.Data.Entities
{
    public class Person
    {
        private short? _genderId;

        public long Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? Birthdate { get; set; }

        public short? GenderId
        {
            get { return _genderId; }
            set { _genderId = value; }    
        }

        public Gender? Gender
        {
            get { return (Gender?)_genderId; }
            set { _genderId = (short?)value; }
        }

        public long FamilyId { get; set; }
    }
}
