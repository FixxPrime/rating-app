using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using rating_api.Entities;
using rating_api.Models;

namespace rating_api.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public const byte MAX_HASHEDPASSWORD = 255;
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(u => u.Id);

            //Fields
            builder.Property(d => d.Username)
                .HasMaxLength(User.MAX_USERNAME_LENGTH)
                .IsRequired();

            builder.Property(d => d.Login)
                .HasMaxLength(User.MAX_LOGIN_LENGTH)
                .IsRequired();

            builder
                .HasIndex(u => u.Login)
                .IsUnique();

            builder.Property(d => d.Password)
                .HasMaxLength(MAX_HASHEDPASSWORD)
                .IsRequired();
        }
    }
}
