using System.Text.RegularExpressions;

namespace rating_api.Models
{
    public class Card
    {
        public const byte MAX_SNP_LENGTH = 50;
        public const byte MAX_PHONE_LENGTH = 50;
        public const string PATTERN_SN = "^[A-Za-zА-Яа-я]+$";
        public const string PATTERN_P = "^[A-Za-zА-Яа-я]*$";

        private Card(Guid id, string surname, string name, string patronymic, string phone, DateTime birthday, uint position,Guid departmentID)
        {
            Id = id;
            Surname = surname;
            Name = name;
            Patronymic = patronymic;
            Phone = phone;
            Birthday = birthday;
            Position = position;
            DepartmentID = departmentID;
        }
        public Guid Id { get; private set; }
        public string Surname { get; private set; } = string.Empty;
        public string Name { get; private set; } = string.Empty;
        public string Patronymic { get; private set; } = string.Empty;
        public string Phone { get; private set; } = string.Empty;
        public DateTime Birthday { get; private set; }
        public uint Position { get; private set; }
        public Guid DepartmentID { get; private set; }
        public Department? Department { get; private set; }

        public static (Card? Card, string? Error) CreateWithValidation(Guid id, string surname, string name, string patronymic, string phone, DateTime birthday, uint position,Guid departmentID)
        {
            if (string.IsNullOrWhiteSpace(surname) || string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(phone))
            {
                return (null, "All fields are required");
            }

            if (surname.Length > MAX_SNP_LENGTH || name.Length > MAX_SNP_LENGTH || patronymic.Length > MAX_SNP_LENGTH || phone.Length > MAX_SNP_LENGTH)
            {
                return (null, "Surname, name, patronymic and phone cannot be longer than 50 characters");
            }

            if (!Regex.IsMatch(surname, PATTERN_SN) || !Regex.IsMatch(name, PATTERN_SN) || !Regex.IsMatch(patronymic, PATTERN_P))
            {
                return (null, "Surname, name, and patronymic can only contain letters");
            }

            var card = new Card(id, surname.Trim(), name.Trim(), patronymic.Trim(), phone.Trim(), birthday, position, departmentID);

            return (card, null);
        }

        public static Card Create(Guid id, string surname, string name, string patronymic, string phone, DateTime birthday, uint position, Guid departmentID)
        {
            var card = new Card(id, surname, name, patronymic, phone, birthday, position, departmentID);

            return card;
        }

        public static Card UpPositionCard(Card card)
        {
            card.Position += 1;

            return card;
        }

        public static (Card? Card, string? Error) DownPositionCard(Card card)
        {
            if (card.Position <= 1)
            {
                return (null, "Cannot change");
            }
            card.Position -= 1;

            return (card, null);
        }
    }
}
