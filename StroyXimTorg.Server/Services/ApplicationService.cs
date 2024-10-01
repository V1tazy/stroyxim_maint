using System.Net;
using MailKit.Net.Smtp;
using MimeKit;
using StroyXimTorg.Server.Models;
using StroyXimTorg.Server.Services.Interfaces;
using static Org.BouncyCastle.Bcpg.Attr.ImageAttrib;

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
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Новая заявка", _config["Email:Email"]));
        emailMessage.To.Add(new MailboxAddress("Заявка", _config["Email:Client"]));
        emailMessage.Subject = "Новая заявка";

        var htmlContent = $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }}
                .container {{
                    width: 100%;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin: 20px auto;
                    max-width: 600px;
                }}
                .header {{
                    background-color: #fdaa17;
                    color: white;
                    padding: 10px;
                    border-radius: 10px 10px 0 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }}
                .header img {{
                    height: 50px;
                    margin-right: 15px;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                }}
                .content {{
                    padding: 20px;
                }}
                .content p {{
                    margin: 10px 0;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>Новая заявка</h1>
                </div>
                <div class='content'>
                    <p><strong>Имя:</strong> {application.Name}</p>
                    <p><strong>Телефон:</strong> {application.PhoneNumber}</p>
                    <p><strong>Сообщение:</strong></p>
                    <p>{application.Description}</p>
                </div>
                <div class='footer'>
                    <p>Это письмо было сгенерировано автоматически. Пожалуйста, не отвечайте на него.</p>
                </div>
            </div>
        </body>
        </html>";

        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = htmlContent
        };

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync("smtp.mail.ru", 465, true);
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