import { API } from '../../network/client';
import { ReqSignUp, ResCheck, ResRefresh, ResSignUp } from './classes';

const PATHS = {
  SIGNUP: '/signup',
  CHECK: '/check',
  REFRESH: '/refresh'
}

export const AuthAPI = {
  singup: async (data: ReqSignUp) => {
    return API.post<ResSignUp>({
      url: PATHS.SIGNUP,
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