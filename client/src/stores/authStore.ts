import { AuthAPI } from '../api/auth/routes';
import { makeAutoObservable } from 'mobx';
import { API } from '../network/client';
import { AxiosRequestConfig } from 'axios';
import { ReqSignIn, ReqSignUp } from '../api/auth/classes';
import { showError } from '../utils/notifications';

class AuthStore {
  init: boolean = false;
  loading: boolean = false;

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
    API.setOnAuthError(async () => {
      const resp = await AuthAPI.refresh();
      console.log(resp)
      if (resp.isSuccess) {
        if (resp.data) {
          this.setAuth(resp.data.tokens);
          return true;
        }
      }
      return false;
    });
    this.check()
  }
  //TODO: extend type 'data'
  setAuth = (data: { accessToken: string; refreshToken: string }) => {
    console.log('DEV: SetUserTokens', JSON.stringify(data));
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    this.setInit(true)
  };

  setInit = (value: boolean) => {
    this.init = value
  }

  setLoading = (value: boolean) => {
    this.loading = value
  }

  signUp = async (data: ReqSignUp) => {
    const resp = await AuthAPI.singup(data)
    if (resp.data) {
      this.setAuth({ accessToken: resp.data?.tokens.accessToken, refreshToken: resp.data?.tokens.refreshToken })
    } else {
      showError('Такой пользователь уже существует!')
    }
  }

  signIn = async (data: ReqSignIn) => {
    const resp = await AuthAPI.signin(data)
    if (resp.data) {
      this.setAuth({ accessToken: resp.data?.tokens.accessToken, refreshToken: resp.data?.tokens.refreshToken })
    } else {
      showError('Неверный пароль или email')
    }
  }

  check = async () => {
    this.setLoading(true)
    const resp = await AuthAPI.check()
    if (resp.isSuccess) {
      this.setInit(true)
    } else {
      this.setInit(false)
    }
    this.setLoading(false)
  }

  logout = () => {
    this.setInit(false)
    localStorage.clear()
  }
}

export const authStore = new AuthStore();
