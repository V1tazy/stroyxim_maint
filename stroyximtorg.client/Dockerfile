FROM node:18 AS build
WORKDIR /app

# Копируем файлы проекта и устанавливаем зависимости
COPY package*.json ./

RUN rm -rf node_modules package-lock.json
RUN npm install

# Копируем весь код и проверяем состояние файлов
COPY . ./

# Выводим права доступа к файлам в node_modules/.bin для отладки
RUN ls -la ./node_modules/.bin
RUN chmod +x ./node_modules/.bin/*  # Устанавливаем права на выполнение для всех бинарников

# Выполняем сборку и выводим логи
RUN npm run build || (echo "Build failed" && exit 1)