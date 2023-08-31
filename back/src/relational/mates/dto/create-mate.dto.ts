import { IsString } from "class-validator";

export class CreateMateDto {
  @IsString()
  timezone: string;
}
