import { contract } from '@sommhai/api-contract';
import { initTsrReactQuery } from '@ts-rest/react-query/v5';

import { API_BASE_URL } from '@/env';
import { apiFetcher } from '@/libs/axios';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {},
  api: apiFetcher,
});
