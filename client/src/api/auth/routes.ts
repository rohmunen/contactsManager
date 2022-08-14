import { API } from '../../network/client';
import { ReqSignUp, ResCheck, ResRefresh, ResAuth, ReqSignIn } from './classes';

const PATHS = {
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  CHECK: '/check',
  REFRESH: '/refresh'
}

export const AuthAPI = {
  singup: async (data: ReqSignUp) => {
    return API.post<ResAuth>({
      url: PATHS.SIGNUP,
      data,
    })
  },
  signin: async (data: ReqSignIn) => {
    return API.post<ResAuth>({
      url: PATHS.SIGNIN,
      data,
    })
  },
  check: async () => {
    return API.get<ResCheck>({
      url: PATHS.CHECK,
    })
  },
  refresh: async () => {
    return API.get<ResRefresh>({
      url: PATHS.REFRESH
    })
  }
}