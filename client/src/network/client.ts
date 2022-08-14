import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { INetResult, NetRequest, RequestType } from './client-types';
import { handleAxiosError, handleAxiosSuccess } from './client-utils';

class NetClient {
  private targetHost: string = '';
  private axiosInstance: AxiosInstance = axios.create();
  private onAuthError?: (err: any) => Promise<boolean>;

  addRequestInterceptor(
    onConfig: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  ) {
    this.axiosInstance.interceptors.request.use(onConfig);
    return this;
  }

  addResponseInterceptor(onResponse: (response: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>, onError: (error: any) => any) {
    this.axiosInstance.interceptors.response.use(onResponse, onError);
    return this;
  }

  setHost(host: string) {
    this.targetHost = host;
    return this;
  }

  setOnAuthError(onAuthError: (error: any) => Promise<boolean>) {
    this.onAuthError = onAuthError;
    return this;
  }

  async get<T = any>(request: NetRequest = new NetRequest()) {
    request.requestType = RequestType.GET;
    return await this.makeRequest<T>(request);
  }

  async post<T = any>(request: NetRequest = new NetRequest()) {
    request.requestType = RequestType.POST;
    return await this.makeRequest<T>(request);
  }

  async put<T = any>(request: NetRequest = new NetRequest()) {
    request.requestType = RequestType.PUT;
    return await this.makeRequest<T>(request);
  }

  async patch<T = any>(request: NetRequest = new NetRequest()) {
    request.requestType = RequestType.PATCH;
    return await this.makeRequest<T>(request);
  }

  async delete<T = any>(request: NetRequest = new NetRequest()) {
    request.requestType = RequestType.DELETE;
    return await this.makeRequest<T>(request);
  }

  async makeRequest<T = any>(request: NetRequest): Promise<INetResult<T>> {
    try {
      let requestPromise;
      switch (request.requestType) {
        case RequestType.POST:
          requestPromise = this.axiosInstance.post<T>(`${this.targetHost}${request.url}`, request.data, {
            params: request.params,
            headers: request.headers,
          });
          break;
        case RequestType.PUT:
          requestPromise = this.axiosInstance.put<T>(`${this.targetHost}${request.url}`, request.data, {
            params: request.params,
            headers: request.headers,
          });
          break;
        case RequestType.PATCH:
          requestPromise = this.axiosInstance.patch<T>(`${this.targetHost}${request.url}`, request.data, {
            params: request.params,
            headers: request.headers,
          });
          break;
        case RequestType.DELETE:
          requestPromise = this.axiosInstance.delete<T>(`${this.targetHost}${request.url}`, {
            params: request.params,
            headers: request.headers,
          });
          break;

        //default is GET
        default:
          requestPromise = this.axiosInstance.get<T>(`${this.targetHost}${request.url}`, {
            params: request.params,
            headers: request.headers,
          });
          break;
      }

      const response = await requestPromise;
      return handleAxiosSuccess<T>(response);
    } catch (error: any) {
      //Обработка токена!
      console.log('ERR = ', error);
      if (error.response && error.response.status === 401 && this.onAuthError) {
        const isSuccess = await this.onAuthError(error)
          .then((val) => val)
          .catch((_) => false);
        if (isSuccess) {
          return await this.makeRequest(request);
        }
        return handleAxiosError<T>(error);
      }

      return handleAxiosError<T>(error);
    }
  }
}

export const API = new NetClient();
