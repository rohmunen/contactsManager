import { AxiosResponse } from 'axios';
import { INetResult } from './client-types';

export function handleAxiosSuccess<T = any>(response: AxiosResponse<T, any>): INetResult<T> {
  console.log('NetClient: handleSuccess = ', response.data);

  return {
    isSuccess: true,
    code: response.status,
    data: response.data,
  };
}

//обработчик ошибок
export function handleAxiosError<T = any>(err: any): INetResult<T> {
  console.log('NetClient: handleError = ', err.response);

  const result: INetResult<T> = {
    isSuccess: false,
    code: 500,
    message: 'Произошла неизвестная ошибка',
    errorData: null,
  };

  if (err.response) {
    if (typeof err.response.status === 'number') {
      result.code = err.response.status;
    }
    if (err.response.data) {
      if (typeof err.response.data.message === 'string') {
        result.message = err.response.data.message;
      }

      if (err.response.data.errorData) {
        result.errorData = err.response.data.errorData;
      }
    }
  }

  return result;
}
