# syntax=docker/dockerfile:1

# Using a multi-stage build process for optimal image size and security
ARG NODE_VERSION=20.17.0

################################################################################
# Base stage with shared configuration
FROM node:${NODE_VERSION}-alpine as base

################################################################################
# Builder stage to prune the monorepo
FROM base as builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install Turbo globally
RUN npm install -g turbo@^2

# Copy the entire repository
COPY . .

# Use Turbo to prune the monorepo to only the api package and its dependencies
RUN turbo prune api --docker

################################################################################
# Installer stage to install dependencies and build the application
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy the pruned lockfile and package.json files
COPY --from=builder /app/out/json/ .

# Install pnpm and project dependencies
RUN npm install -g pnpm@9
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy the pruned source code
COPY --from=builder /app/out/full/ .

# Build the API application
RUN pnpm build --filter=api

################################################################################
# Production stage with minimal dependencies
FROM base as production
WORKDIR /app

# RUN npm install -g pnpm@9

# Copy built application and necessary files
COPY --from=installer /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer /app/apps/api/build ./apps/api/build
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/packages ./packages

# Install production dependencies only
# RUN pnpm install -r --filter=api --prod --ignore-scripts

# Create and use non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser
USER apiuser

# Run the application
CMD ["node", "apps/api/build/index.js"]