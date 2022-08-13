import { API } from '../../network/client';
import { ReqSignUp, ResCheck, ResSignUp } from './classes';

const PATHS = {
  SIGNUP: '/signup',
  CHECK: '/check'
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
  }
}