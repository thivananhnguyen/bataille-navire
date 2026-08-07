FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY index.html ./index.html
COPY server.js ./server.js

USER app
EXPOSE 8080
CMD ["node", "server.js"]