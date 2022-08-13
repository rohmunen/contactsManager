import { AuthAPI } from '../api/auth/routes';
import { AxiosRequestConfig } from 'axios';
import { makeAutoObservable } from 'mobx';
import { API } from '../network/client';

class AuthStore {
  init: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  initApp() {
    API.setHost('http://localhost:8080/api');
  }
  //TODO: extend type 'data'
  setAuth = (data: { accessToken: string; refreshToken: string }) => {
    console.log('DEV: SetUserTokens', JSON.stringify(data));
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    this.init = true;
  };

  signUp = async (data: {email: string, nickname: string, password: string}) => {
    const resp = await AuthAPI.singup(data)
    if (resp.data) {
      this.setAuth({accessToken: resp.data?.tokens.accessToken, refreshToken: resp.data?.tokens.refreshToken})
    }
  }
}

export const authStore = new AuthStore();
