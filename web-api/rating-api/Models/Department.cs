using System.Text.RegularExpressions;

namespace rating_api.Models
{
    public class Department
    {
        public const byte MAX_NAME_LENGTH = 250;
        public const string PATTERN_NAME = "^[A-Za-zА-Яа-я0-9\\s]+$";

        private Department(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
        public Guid Id { get; private set; }
        public string Name { get; private set; } = string.Empty;
        public List<Card> Cards { get; private set; } = new List<Card>();

        public static (Department? Department, string? Error) CreateWithValidation(Guid id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return (null, "All fields are required");
            }

            if (name.Length > MAX_NAME_LENGTH)
            {
                return (null, "Name cannot be longer than 250 characters");
            }

            if (!Regex.IsMatch(name, PATTERN_NAME))
            {
                return (null, "Name can only contain letters and numbers");
            }

            var department = new Department(id, name.Trim());

            return (department, null);
        }

        public static Department Create(Guid id, string name)
        {
            var department = new Department(id, name);

            return department;
        }
    }
}
