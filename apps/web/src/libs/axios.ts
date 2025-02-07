import { ApiFetcher } from '@ts-rest/core';
import axios, { AxiosError, AxiosResponse, isAxiosError, Method } from 'axios';

import { API_BASE_URL } from '@/env';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiFetcher: ApiFetcher = async (args) => {
  const { body, method, path, headers } = args;
  try {
    const result = await apiClient.request({
      method: method as Method,
      url: path,
      headers,
      data: body,
    });

    return {
      status: result.status,
      body: result.data,
      // @ts-expect-error toJSON is not typed
      headers: new Headers(result.headers.toJSON() || ''),
    };
  } catch (e: Error | AxiosError | unknown) {
    if (isAxiosError(e) && e.response) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;

      if (response.status === 409 && response.data.message === 'Invalid cookie') {
        window.location.reload();
      }

      return {
        status: response.status,
        body: response.data,
        // @ts-expect-error toJSON is not typed
        headers: new Headers(response.headers.toJSON() || ''),
      };
    }

    return {
      status: 500,
      body: { message: 'Network Error' },
      headers: new Headers(),
    };
  }
};
