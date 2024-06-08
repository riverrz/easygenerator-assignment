export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  success: true;
}


export interface SignupRequestDto {
  email: string;
  name: string;
  password: string;
}
export interface SignupResponseDto {
  success: true;
}
