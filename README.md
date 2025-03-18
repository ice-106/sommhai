# SomMhai App

## Pre-requisites

- [Node.js (>=20.0.0)](https://nodejs.org/en/) - JavaScript runtime
- [PNPM (>=9.0.0)](https://pnpm.io/) - Package manager
- [Docker](https://www.docker.com/) - Containerization platform

## Getting Started

### Local Development

1. Install Dependencies

   ```bash
   pnpm install
   ```

2. Configure `.env` file, example can be use from `.env.example` or run the following command

   ```bash
   cp apps/liff/.env.example apps.liff/.env
   ```

3. Obtain LIFF Channel ID from [LINE Developers](https://developers.line.biz/)

   - Create your own providers with `LINE Login` application type
   - Create LIFF channel
   - Add the LIFF Chaneel ID on `NEXT_PUBLIC_LIFF_ID`

4. Prepare local database instance

   ```bash เดะมาเขียนต่อ
   docker compose up -d
   pnpm db:migrate
   pnpm db:seed
   ```

5. Start the development server

   ```bash
   pnpm dev
   ```

   See in the console for the URL of the development server. Basically, as shown below.

|   app   |            URL             | Description        |
| :-----: | :------------------------: | ------------------ |
|   web   |   http://localhost:3000    | Landing Page (TBD) |
|  liff   |   http://localhost:3001    | Line Webview       |
|   api   |   http://localhost:8080    | SomMhai API        |
| swagger | http://localhost:8080/docs | API Doc            |

## Turbo

### Package Installation

```bash
# Install a package in a workspace
pnpm add <package> --filter <workspace>

# Remove a package from a workspace
pnpm uninstall <package> --filter <workspace>

# Upgrade a package in a workspace
pnpm update <package> --filter <workspace>
```

### Add ui components

Use the pre-made script:

```sh
pnpm ui:add <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI.

### Add a new app

Turborepo offer a simple command to add a new app:

```sh
pnpm turbo gen workspace --name <app-name>
```

This will create a new empty app in the `apps` directory.

If you want, you can copy an existing app with:

```sh
pnpm turbo gen workspace --name <app-name> --copy
```

> [!NOTE]
> Remember to run `pnpm install` after cloneing the app.

# Repository Structure

ประกอบไปด้วย 3 folder หลัก ๆ

```tree
sommhai/
├── apps/
│     └──api/
│      └──liff/
│      └──web/
│      └──mobile/
│
└── packages/
    ├── api-contract
    ├── shared-type
    └── ui
```

**api**: backend service for SomMhai.

**liff**: line webview for SomMhai.

**web**: potentail landing page.

**mobile**: poentail SomMhai mobile app.

**api-contract**: ts-rest contract.

**shared-type**: shared typescript interterface

**ui**: shared ui components
