export interface ReqSignUp {
  email: string;
  nickname: string;
  password: string;
}

export interface ResSignUp {
  tokens: {
    accessToken: string;
    refreshToken: string;
  },
  user: {
    email: string;
    id: string;
    nickname: string;
  }
}

export interface ResCheck {
  token: string;
}
