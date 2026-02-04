# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar Angular para producción
RUN npm run build -- --configuration production

# Etapa 2: Nginx para servir
FROM nginx:stable-alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos compilados de Angular (ajusta al nombre real del proyecto)
COPY --from=build /app/dist/app-portfolio /usr/share/nginx/html

EXPOSE 5002
CMD ["nginx", "-g", "daemon off;"]