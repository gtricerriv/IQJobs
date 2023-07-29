# Usa una imagen de Node.js v18 como base
FROM node:18.17.0

# Establece el directorio de trabajo en '/app'
WORKDIR /app

# Copia 'package.json' y 'package-lock.json'
COPY package*.json ./

# Instala las dependencias y elimina la cache al finalizar
RUN npm ci --only=production && npm cache clean --force

# Copia el directorio de la app
COPY . .

# Construye la app para producción
RUN npm run build

# Usa una imagen de Nginx como base
FROM nginx:alpine

# Copia el directorio de la app construida al directorio de Nginx
COPY --from=0 /app/dist /usr/share/nginx/html

# Copia el archivo de configuración para Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Inicia el servidor de Nginx
CMD ["nginx", "-g", "daemon off;"]
