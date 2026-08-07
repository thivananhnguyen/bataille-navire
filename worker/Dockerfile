FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY package*.json ./
COPY src ./src

USER app
EXPOSE 3002
CMD ["node", "src/index.js"]
