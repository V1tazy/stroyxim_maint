using StroyXimTorg.Server.Models;

namespace StroyXimTorg.Server.Services.Interfaces;

public interface IApplicationService
{
    Task SendApplicationToTelegramAsync(ApplicationModel application);
    Task SendApplicationToEmailAsync(ApplicationModel application);
    bool CreateApplication(ApplicationModel application);
}