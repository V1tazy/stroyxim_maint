FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY StroyXimTorg.Server.csproj .
RUN dotnet restore

# Копируем все файлы и собираем проект
COPY . .
RUN dotnet publish -c Release -o out

# Используем официальный образ .NET Runtime для выполнения
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Открываем порт, на котором будет работать приложение
EXPOSE 80

# Определяем команду для запуска приложения
ENTRYPOINT ["dotnet", "StroyXimTorg.Server.dll"]