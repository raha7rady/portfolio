using System.Net.Mail;

namespace Portfolio.Application.Contact;

/// <summary>
/// اعتبارسنجی ساده و دستی — عمداً بدون کتابخانه خارجی (مثل FluentValidation)
/// چون برای یک فرم سه‌فیلدی، اضافه‌کردن یک کتابخانه کامل توجیه معماری ندارد.
/// </summary>
public static class ContactRequestValidator
{
    public const int NameMaxLength = 100;
    public const int MessageMinLength = 10;
    public const int MessageMaxLength = 2000;

    public static IReadOnlyList<string> Validate(ContactRequestDto request)
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(request.Name))
        {
            errors.Add("نام نمی‌تواند خالی باشد.");
        }
        else if (request.Name.Trim().Length > NameMaxLength)
        {
            errors.Add($"نام نباید بیشتر از {NameMaxLength} کاراکتر باشد.");
        }

        if (string.IsNullOrWhiteSpace(request.Email))
        {
            errors.Add("ایمیل نمی‌تواند خالی باشد.");
        }
        else if (!IsValidEmail(request.Email))
        {
            errors.Add("فرمت ایمیل معتبر نیست.");
        }

        if (string.IsNullOrWhiteSpace(request.Message))
        {
            errors.Add("پیام نمی‌تواند خالی باشد.");
        }
        else if (request.Message.Trim().Length < MessageMinLength)
        {
            errors.Add($"پیام باید حداقل {MessageMinLength} کاراکتر باشد.");
        }
        else if (request.Message.Trim().Length > MessageMaxLength)
        {
            errors.Add($"پیام نباید بیشتر از {MessageMaxLength} کاراکتر باشد.");
        }

        return errors;
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            _ = new MailAddress(email.Trim());
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }
}
