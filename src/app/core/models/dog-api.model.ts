type API_STATUS = 'success' | 'error'

export interface BaseApiResponse<T> {
  message: T;
  status: API_STATUS
}

export type BreedListApiResponse = BaseApiResponse<Record<string, string[]>>;

export type BreedImageApiResponse = BaseApiResponse<string>;
