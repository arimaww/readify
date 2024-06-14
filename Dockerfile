FROM node:20.14.0-alpine3.19 AS Testing
ENV NODE_ENV=production
WORKDIR /usr/src/api
COPY package.json .
COPY package-lock.json .

RUN pnpm install

COPY . .

RUN pnpm run dev

CMD ["sh", "-c", "pnpm run dev"]