type API_STATUS = 'success' | 'error'

export interface BreedListApiResponse {
  message: Record<string, string[]>,
  status: API_STATUS
}

export interface BreedImageApiResponse {
  message: string,
  status: API_STATUS
}
