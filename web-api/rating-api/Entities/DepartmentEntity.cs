namespace rating_api.Entities
{
    public class DepartmentEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<CardEntity> Cards { get; set; } = new List<CardEntity>();
    }
}
