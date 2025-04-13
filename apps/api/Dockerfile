FROM node:20-alpine AS preparer

WORKDIR /app

RUN npm install -g turbo@2

COPY . .

RUN turbo prune --scope=api --docker

#########################################################################

FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git
RUN npm install -g pnpm@9

COPY --from=preparer /app/.git .
COPY --from=preparer /app/out/json/ .
COPY --from=preparer /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY --from=preparer /app/out/full/ .

RUN pnpm build --filter=api

RUN pnpm prune --prod

#########################################################################

FROM node:18-alpine3.20 AS runner

WORKDIR /app

COPY --from=builder /app/apps/api/build .

CMD ["node", "index.js"]
