# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build -- --configuration production

# Etapa 2: Nginx para servir
FROM nginx:stable-alpine

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/portfolio-ui.conf

# Copiar archivos compilados de Angular
COPY --from=build /app/dist/app-portfolio /usr/share/nginx/html

EXPOSE 5003
CMD ["nginx", "-g", "daemon off;"]