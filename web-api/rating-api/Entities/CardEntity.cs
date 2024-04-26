namespace rating_api.Entities
{
    public class CardEntity
    {
        public Guid Id { get; set; }
        public string Surname { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Patronymic { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public uint Position { get; set; }
        public Guid DepartmentID { get; set; }
        public DepartmentEntity? Department { get; set; }
    }
}
