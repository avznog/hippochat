import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {

  @IsNotEmpty()
  @ApiProperty({
    description: "username to log in",
    required: true,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
  @ApiProperty({
    description: "password to log in",
    required: true,
    type: "password"
  })
  password: string;
}