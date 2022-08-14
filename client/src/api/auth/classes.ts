export interface ReqSignUp {
  email: string;
  nickname: string;
  password: string;
}
export interface ResAuth {
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
export interface ReqSignIn {
  email: string;
  password: string;
}
export interface ResRefresh {
  tokens: {
    accessToken: string;
    refreshToken: string;
  }
}

export interface ResCheck {
  token: string;
}
