import { API } from '../../network/client';
import { ReqSignUp, ResSignUp } from './classes';

const PATHS = {
  SIGNUP: '/signup',
}

export const AuthAPI = {
  singup: async (data: ReqSignUp) => {
    return API.post<ResSignUp>({
      url: PATHS.SIGNUP,
      data,
    })
  }
}