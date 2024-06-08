export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupRequestDto {
  email: string;
  name: string;
  password: string;
}
export interface SignupResponseDto {
  success: true;
}
