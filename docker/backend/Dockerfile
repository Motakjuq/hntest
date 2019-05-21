FROM node:10-slim AS builder

WORKDIR /src

COPY backend/ .

RUN yarn install && yarn build


FROM node:10-slim

WORKDIR /src

COPY --from=builder /src/dist dist
COPY --from=builder /src/package.json package.json
COPY --from=builder /src/yarn.lock yarn.lock
COPY --from=builder /src/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN apt-get update && apt-get install --no-install-recommends -y cron \
    && yarn install --prod && chmod +x /usr/local/bin/entrypoint.sh \
    && ln -s /usr/local/bin/entrypoint.sh / \
    && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "entrypoint.sh" ]

CMD [ "backend" ]
