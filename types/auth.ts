export interface ILoginBody {
  identifier: string;
  password: string;
  remember?: boolean;
}

export interface IRegisterBody {
  name: string;
  email: string;
  password: string;
  referral_code?: string;
  consent?: boolean;
}

export interface IVerifyEmailBody {
  email: string;
  code: string;
}

export interface IResendVerificationEmailBody {
  email: string;
}

export interface IRefreshBody {
  refresh_token: string;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}
