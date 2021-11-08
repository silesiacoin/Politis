FROM node:lts AS builder

WORKDIR /politis

COPY ./yarn.lock ./
COPY ./package.json ./

RUN yarn

COPY ./public ./public
COPY ./src ./src
COPY tsconfig.json ./

RUN yarn build

FROM nginx

COPY --from=builder /politis/build /usr/share/nginx/html
