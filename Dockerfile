# Используем образ для .NET 6.0
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Этап сборки .NET
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Копируем sln файл и восстанавливаем зависимости
COPY StroyXimTorg.sln ./
COPY StroyXimTorg.Server/StroyXimTorg.Server.csproj ./StroyXimTorg.Server/

RUN dotnet restore "StroyXimTorg.Server/StroyXimTorg.Server.csproj"

# Копируем все файлы проекта
COPY . ./

# Сборка проекта
WORKDIR "/src/StroyXimTorg.Server"
RUN dotnet build "StroyXimTorg.Server.csproj" -c Release -o /app/build

# Публикация
FROM build AS publish
RUN dotnet publish "StroyXimTorg.Server.csproj" -c Release -o /app/publish

# Этап сборки клиентской части на Node.js
FROM node:18 AS client-build
WORKDIR /app

# Копируем файлы package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код и проверяем состояние файлов
COPY . ./
RUN ls -la ./node_modules/.bin
RUN chmod +x ./node_modules/.bin/*  # Устанавливаем права на выполнение для всех бинарников

# Выполняем сборку клиентской части и выводим логи
RUN npm run build --verbose || (echo "Build failed" && exit 1)

# Используем базовый образ .NET и копируем собранное приложение и клиентскую часть
FROM base AS final
WORKDIR /app

# Копируем опубликованные файлы .NET приложения
COPY --from=publish /app/publish ./

# Копируем собранную клиентскую часть
COPY --from=client-build /app/dist ./client  # Убедитесь, что путь корректен

# Задаём точку входа
ENTRYPOINT ["dotnet", "StroyXimTorg.Server.dll"]
