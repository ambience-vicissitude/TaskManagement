using System.ComponentModel.DataAnnotations;

namespace ReactApp2.Server.Models.Interfaces
{
    public interface IIdentifiable
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string? Name { get; set; }
        [StringLength(500)]
        public string? Description { get; set; }
    }
}
