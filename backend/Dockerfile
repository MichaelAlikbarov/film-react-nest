FROM node:20-alpine AS base
WORKDIR /app
COPY  package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]