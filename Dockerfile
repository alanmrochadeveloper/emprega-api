FROM node:20-alpine AS build

WORKDIR /app/api

COPY ./package*.json ./

RUN  npm install

COPY . .

CMD npm run build

# PROD stage

FROM node:20-alpine AS prod

WORKDIR /app/api

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/api/dist ./dist

COPY ./package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3001

CMD ["node", "dist/main.js"]
