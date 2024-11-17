# Usa la imagen base de Node.js 20.13.1
FROM node:20.13.1

# Crea el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación de React
RUN npm run build

# Expone el puerto que usará la aplicación
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
