namespace ReactApp2.Server.Models.Interfaces
{
    public interface ISeries<T> : IIdentifiable
        where T: class
    {
        List<T>? Items { get; set; }
    }
}
