# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20.17.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base


FROM base as builder
RUN apk update
RUN apk add --no-cache libc6-compat

# Set working directory for all build stages.
WORKDIR /app

RUN npm install -g turbo@^2

COPY . .

RUN turbo prune liff --docker

################################################################################
# Install dependencies in a separate stage to take advantage of caching.
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

# Install dependencies with pnpm
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code from pruned workspace
COPY --from=builder /app/out/full/ .

RUN pnpm build --filter=liff

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/liff/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/liff/.next/static ./apps/liff/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/liff/public ./apps/liff/public

RUN chmod -R 755 ./apps/liff/.next/static
# Run the application as a non-root user.
USER nextjs

# ENV HOSTNAME="0.0.0.0"
# Run the application.
CMD ["node", "apps/liff/server.js"]
