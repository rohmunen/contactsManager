export interface ReqSignUp {
  email: string;
  nickname: string;
  password: string;
}

export interface ResSignUp {
  accessToken: string;
  refreshToken: string;
}
