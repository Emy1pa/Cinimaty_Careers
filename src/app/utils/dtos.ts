export interface RegisterUserDto {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
export interface CreateApplicationDto {
  fullName: string;
  email: string;
  message: string;
  cv: File;
  offerId: string;
}
