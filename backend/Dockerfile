FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro (otimiza o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código do backend
COPY . .

EXPOSE 3000

# Executa o script de desenvolvimento (garanta que o nodemon está no seu package.json)
CMD ["npm", "run", "dev"]
