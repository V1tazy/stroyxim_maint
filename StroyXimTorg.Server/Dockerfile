# Используем образ для .NET 6.0
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Строим этап
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Копируем sln файл и восстанавливаем зависимости
COPY StroyXimTorg.sln ./

COPY ./StroyXimTorg.Server/StroyXimTorg.Server.csproj ./StroyXimTorg.Server/

RUN dotnet restore "StroyXimTorg.Server/StroyXimTorg.Server.csproj"

# Копируем все файлы проекта
COPY . .

# Сборка проекта
WORKDIR "/src/StroyXimTorg.Server"
RUN dotnet build "StroyXimTorg.Server.csproj" -c Release -o /app/build

# Публикация
FROM build AS publish
RUN dotnet publish "StroyXimTorg.Server.csproj" -c Release -o /app/publish

# Используем базовый образ и копируем собранное приложение
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StroyXimTorg.Server.dll"]
