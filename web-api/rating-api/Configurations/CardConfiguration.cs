using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using rating_api.Entities;
using rating_api.Models;

namespace rating_api.Configurations
{
    public class CardConfiguration : IEntityTypeConfiguration<CardEntity>
    {
        public void Configure(EntityTypeBuilder<CardEntity> builder)
        {
            builder.HasKey(c => c.Id);

            //Relations
            builder
                .HasOne(c => c.Department)
                .WithMany(d => d.Cards)
                .HasForeignKey(d => d.DepartmentID);

            //Fields
            builder.Property(d => d.Surname)
                .HasMaxLength(Card.MAX_SNP_LENGTH)
                .IsRequired();

            builder.Property(d => d.Name)
                .HasMaxLength(Card.MAX_SNP_LENGTH)
                .IsRequired();

            builder.Property(d => d.Patronymic)
                .HasMaxLength(Card.MAX_SNP_LENGTH);

            builder.Property(d => d.Phone)
                .HasMaxLength(Card.MAX_SNP_LENGTH)
                .IsRequired();

            builder.Property(d => d.Birthday)
                .IsRequired();

            builder.Property(d => d.Position)
                .IsRequired();

            builder.Property(d => d.DepartmentID)
                .IsRequired();
        }
    }
}
