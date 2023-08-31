import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Mate } from "src/relational/mates/entities/mate.entity";

export class CreateDaysEmojiDto {
  @ApiProperty({
    description: "Date en string sous la forme de YYYY-MM-DD",
    required: true
  })
  date: string;

  @ApiProperty({
    description: "Le mate qui a mis l'emoji"
  })
  mate: Mate;

  @ApiProperty({
    description: "Emoji",
    required: true
  })
  @IsString()
  value: string;
}
