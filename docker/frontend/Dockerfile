FROM node:10-slim AS builder

WORKDIR /www

COPY frontend/ .

RUN yarn install && yarn build && rm -Rf node_modules


FROM nginx:latest

COPY --from=builder /www/build /srv/www/hn
COPY docker/frontend/nginx/default.conf /etc/nginx/conf.d/default.conf