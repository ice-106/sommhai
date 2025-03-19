import { contract } from '@sommhai/api-contract';
import { initQueryClient } from '@ts-rest/react-query';

import { API_BASE_URL } from '@/env';
import { apiFetcher } from '@/libs/axios';

export const client = initQueryClient(contract, {
  baseUrl: API_BASE_URL,
  baseHeaders: {},
  api: apiFetcher,
});
