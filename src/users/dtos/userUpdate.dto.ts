import { OmitType, PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { UserCreateDto } from "./userCreate.dto";

export class UserUpdateDto extends PartialType(OmitType(UserCreateDto, ['password', 'name'])) {
  @IsString()
  name: string;

  @IsString()
  password: string;
}