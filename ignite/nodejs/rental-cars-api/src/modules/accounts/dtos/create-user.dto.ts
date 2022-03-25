export interface ICreateUserDto {
  name: string;
  email: string;
  password: string;
  driverLicense: string;
  id?: string;
  avatar?: string;
}
