import { IsNotEmpty, IsNumber, IsString, IsUUID, Min, MinLength } from "class-validator";

export class UserCreateDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsNumber()
  age: number;
}