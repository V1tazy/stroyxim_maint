FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# �������� csproj � ��������������� �����������
COPY StroyXimTorg.Server.csproj .
RUN dotnet restore

# �������� ��� ����� � �������� ������
COPY . .
RUN dotnet publish -c Release -o out

# ���������� ����������� ����� .NET Runtime ��� ����������
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# ��������� ����, �� ������� ����� �������� ����������
EXPOSE 80

# ���������� ������� ��� ������� ����������
ENTRYPOINT ["dotnet", "StroyXimTorg.Server.dll"]