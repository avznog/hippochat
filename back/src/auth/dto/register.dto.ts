import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsStrongPassword, Min } from "class-validator";

export class RegisterDto {

  @ApiProperty({
    description: "Pseudo of the user",
    required: true
  })
  pseudo: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
  @ApiProperty({
    required: true,
    description: "password of the user"
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: "firstname of the user"
  })
  firstname: string;

  @IsString()
  @ApiProperty({
    description: "lastname of the user"
  })
  lastname: string;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: "age of the user"
  })
  age: number;
}