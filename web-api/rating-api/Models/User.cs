using System.Numerics;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace rating_api.Models
{
    public class User
    {
        public const byte MAX_USERNAME_LENGTH = 50;
        public const byte MIN_USERNAME_LENGTH = 3;
        public const string PATTERN_USERNAME = "^[A-Za-zА-Яа-я0-9\\s]+$";

        public const byte MAX_LOGIN_LENGTH = 50;
        public const byte MIN_LOGIN_LENGTH = 3;
        public const string PATTERN_LOGIN = "^[A-Za-z0-9]+$";

        public const byte MAX_PASSWORD_LENGTH = 50;
        public const byte MIN_PASSWORD_LENGTH = 3;
        public const string PATTERN_PASSWORD = "^[A-Za-z0-9!@#$%^&*()_+]+$";


        private User(Guid id, string username, string login, string password, DateTime dateOfCreate)
        {
            Id = id;
            Username = username;
            Login = login;
            Password = password;
            DateOfCreate = dateOfCreate;
        }
        public Guid Id { get; private set; }
        public string Username { get; private set; } = string.Empty;
        public string Login { get; private set; } = string.Empty;
        public string Password { get; private set; } = string.Empty;
        public DateTime DateOfCreate { get; private set; }

        public static (User? User, string? Error) CreateWithValidation(Guid id, string username, string login, string password)
        {
            if (string.IsNullOrWhiteSpace(login) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(username))
            {
                return (null, "All fields are required");
            }

            if (login.Length > MAX_LOGIN_LENGTH || password.Length > MAX_PASSWORD_LENGTH || username.Length > MAX_USERNAME_LENGTH)
            {
                return (null, "Username, login and password cannot be longer than 50 characters");
            }

            if (login.Length < MIN_LOGIN_LENGTH || password.Length < MIN_PASSWORD_LENGTH || username.Length < MIN_USERNAME_LENGTH)
            {
                return (null, "Username, login and password cannot be under than 3 characters");
            }

            if (!Regex.IsMatch(login, PATTERN_LOGIN) || !Regex.IsMatch(username, PATTERN_USERNAME))
            {
                return (null, "Username and login can only contain letters and numbers");
            }

            if (!Regex.IsMatch(password, PATTERN_PASSWORD))
            {
                return (null, "Password can only contain symbols, letters and numbers");
            }

            DateTime dateOfCreate = DateTime.UtcNow;

            var user = new User(id, username.Trim(), login.Trim(), password.Trim(), dateOfCreate);

            return (user, null);
        }

        public static User Create(Guid id, string username, string login, string password, DateTime dateOfCreate)
        {
            var user = new User(id, username, login, password, dateOfCreate);

            return user;
        }
    }
}
