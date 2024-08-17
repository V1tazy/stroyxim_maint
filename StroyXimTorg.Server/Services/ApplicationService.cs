using System.Net;
using MailKit.Net.Smtp;
using MimeKit;
using StroyXimTorg.Server.Models;
using StroyXimTorg.Server.Services.Interfaces;

namespace StroyXimTorg.Server.Services;

public class ApplicationService : IApplicationService
{
    private readonly IConfiguration _config;
    
    public ApplicationService(IConfiguration config)
    {
        _config = config;
    }
    
    public async Task SendApplicationToTelegramAsync(ApplicationModel application)
    {
        using (var client = new HttpClient())
        {
            string requestUrl = $"https://api.telegram.org/bot{_config["Telegram:Token"]}/sendMessage?chat_id={_config["Telegram:Chat_Id"]}&text={application.ToString()}";
            
            
            await client.PostAsync(requestUrl, null);
            
        }

    }

    public async Task SendApplicationToEmailAsync(ApplicationModel application)
    {
        using var emailMessage = new MimeMessage();
 
        emailMessage.From.Add(new MailboxAddress("Новая заявка", _config["Email:Email"]));
        emailMessage.To.Add(new MailboxAddress("Заявка", _config["Email:Email"]));
        emailMessage.Subject = "Заявка";
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = application.ToString()
        };
             
        using (var client = new SmtpClient())
        {
            await client.ConnectAsync("smtp.gmail.com", 465, true);
            await client.AuthenticateAsync(_config["Email:Email"], _config["Email:Password"]);
            await client.SendAsync(emailMessage);
 
            await client.DisconnectAsync(true);
        }
    }

    public bool CreateApplication(ApplicationModel application)
    {
        throw new NotImplementedException();
    }
}