using Portfolio.Application.Contact;
using Xunit;

namespace Portfolio.Tests;

public class ContactRequestValidatorTests
{
    private static ContactRequestDto ValidRequest() =>
        new("مهتا", "mehta@example.com", "این یک پیام تست معتبر با طول کافی است.");

    [Fact]
    public void Validate_WithFullyValidRequest_ReturnsNoErrors()
    {
        var errors = ContactRequestValidator.Validate(ValidRequest());

        Assert.Empty(errors);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void Validate_WithEmptyName_ReturnsNameError(string name)
    {
        var request = ValidRequest() with { Name = name };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("نام"));
    }

    [Fact]
    public void Validate_WithNameLongerThanMax_ReturnsNameError()
    {
        var tooLongName = new string('a', ContactRequestValidator.NameMaxLength + 1);
        var request = ValidRequest() with { Name = tooLongName };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("نام"));
    }

    [Fact]
    public void Validate_WithNameAtExactMaxLength_ReturnsNoNameError()
    {
        var exactLengthName = new string('a', ContactRequestValidator.NameMaxLength);
        var request = ValidRequest() with { Name = exactLengthName };

        var errors = ContactRequestValidator.Validate(request);

        Assert.DoesNotContain(errors, e => e.Contains("نام"));
    }

    [Theory]
    [InlineData("")]
    [InlineData("not-an-email")]
    [InlineData("missing-at-sign.com")]
    [InlineData("user@")]
    public void Validate_WithInvalidEmail_ReturnsEmailError(string email)
    {
        var request = ValidRequest() with { Email = email };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("ایمیل"));
    }

    [Theory]
    [InlineData("mehta@example.com")]
    [InlineData("mehta.dev+portfolio@example.co")]
    public void Validate_WithValidEmail_ReturnsNoEmailError(string email)
    {
        var request = ValidRequest() with { Email = email };

        var errors = ContactRequestValidator.Validate(request);

        Assert.DoesNotContain(errors, e => e.Contains("ایمیل"));
    }

    [Fact]
    public void Validate_WithEmptyMessage_ReturnsMessageError()
    {
        var request = ValidRequest() with { Message = "" };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("پیام"));
    }

    [Fact]
    public void Validate_WithMessageShorterThanMin_ReturnsMessageError()
    {
        var tooShort = new string('a', ContactRequestValidator.MessageMinLength - 1);
        var request = ValidRequest() with { Message = tooShort };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("پیام"));
    }

    [Fact]
    public void Validate_WithMessageLongerThanMax_ReturnsMessageError()
    {
        var tooLong = new string('a', ContactRequestValidator.MessageMaxLength + 1);
        var request = ValidRequest() with { Message = tooLong };

        var errors = ContactRequestValidator.Validate(request);

        Assert.Contains(errors, e => e.Contains("پیام"));
    }

    [Fact]
    public void Validate_WithAllFieldsInvalid_ReturnsAllThreeErrors()
    {
        var request = new ContactRequestDto("", "invalid", "short");

        var errors = ContactRequestValidator.Validate(request);

        Assert.Equal(3, errors.Count);
    }
}
