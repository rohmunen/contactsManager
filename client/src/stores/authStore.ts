import { AuthAPI } from '../api/auth/routes';
import { makeAutoObservable } from 'mobx';
import { API } from '../network/client';
import { AxiosRequestConfig } from 'axios';
import { useNavigate } from "react-router-dom";

class AuthStore {
  init: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initApp() {
    API.setHost('http://localhost:8080/api');
    API.addRequestInterceptor((config: AxiosRequestConfig) => {
      const accessToken =
        localStorage.getItem('accessToken')
      const refreshToken =
        localStorage.getItem('refreshToken')
      return {
        ...config,
        headers: {
          ...config.headers,
          'access-token': accessToken ?? '',
          'refresh-token': refreshToken ?? '',
        },
      };
    })
    AuthAPI.check()
  }
  //TODO: extend type 'data'
  setAuth = (data: { accessToken: string; refreshToken: string }) => {
    console.log('DEV: SetUserTokens', JSON.stringify(data));
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    this.setInit()
  };

  setInit = () => {
    this.init = true
  }

  signUp = async (data: { email: string, nickname: string, password: string }) => {
    const resp = await AuthAPI.singup(data)
    if (resp.data) {
      this.setAuth({ accessToken: resp.data?.tokens.accessToken, refreshToken: resp.data?.tokens.refreshToken })
      console.log(this.init)
    }
  }

  check = async () => {
    const resp = await AuthAPI.check()
    if (resp.data) {
      this.setInit()
    }
  }
}

export const authStore = new AuthStore();
