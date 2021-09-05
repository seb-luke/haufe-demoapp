FROM node:14.17.6-buster as builder

WORKDIR ~/package
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine3.13
WORKDIR /app
COPY --from=builder ~/package/node_modules ./node_modules
COPY --from=builder ~/package/dist .

ENTRYPOINT ["node", "app.js"]