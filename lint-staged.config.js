const path = require("path");

const TYPESCRIPT_MODULES = [
  {
    name: '@sommhai/api-contract',
    path: 'packages/api-contract',
  },
  {
    name: '@sommhai/shared-type',
    path: 'packages/shared-type',
  },
  {
    name: '@sommhai/ui',
    path: 'packages/ui',
  },
  {
    name: 'api',
    path: 'apps/api',
  },
  {
    name: 'web',
    path: 'apps/web',
  },
];

const TYPESCRIPT_LINTER = TYPESCRIPT_MODULES.reduce((acc, { name, path }) => {
  acc[`${path}/**/*.{js,jsx,ts,tsx}`] = [
    () => `pnpm check-types --filter ${name}`,
    `pnpm lint --filter ${name} -- --fix`,
  ];

  return acc;
}, {});

module.exports = {
  ...TYPESCRIPT_LINTER,
  '*.json': ['prettier --write'],
};
