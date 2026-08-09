namespace Portfolio.Application.Contact;

public sealed class ContactResult
{
    public bool IsSuccess { get; }
    public IReadOnlyList<string> Errors { get; }

    private ContactResult(bool isSuccess, IReadOnlyList<string> errors)
    {
        IsSuccess = isSuccess;
        Errors = errors;
    }

    public static ContactResult Success() => new(true, Array.Empty<string>());

    public static ContactResult Failure(IReadOnlyList<string> errors) => new(false, errors);
}
