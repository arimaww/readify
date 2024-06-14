FROM node:14 AS Testing
WORKDIR /usr/src/client
COPY package.json .
COPY package-lock.json .

RUN pnpm install

COPY . .

RUN pnpm run dev

CMD ["sh", "-c", "pnpm run dev"]