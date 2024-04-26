using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using rating_api.Entities;
using rating_api.Models;

namespace rating_api.Configurations
{
    public class DepartmentConfiguration : IEntityTypeConfiguration<DepartmentEntity>
    {
        public void Configure(EntityTypeBuilder<DepartmentEntity> builder)
        {
            builder.HasKey(d => d.Id);

            //Relations
            builder
                .HasMany(d => d.Cards)
                .WithOne(c => c.Department)
                .HasForeignKey(c => c.DepartmentID);

            //Fields
            builder.Property(d => d.Name)
                .HasMaxLength(Department.MAX_NAME_LENGTH)
                .IsRequired();
        }
    }
}
