import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateCoupleDto {

  @ApiProperty({
    type: "string",
    description: "Nom du couple",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Les deux mates du couple",
    required: true
  })
  matesIds: string[]
}
