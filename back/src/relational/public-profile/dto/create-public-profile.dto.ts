import { ApiProperty } from "@nestjs/swagger";
import { Sex } from "src/constants/sex.type";

export class CreatePublicProfileDto {
  @ApiProperty({
    required: false
  })
  description: string;

  @ApiProperty({
    required: false
  })
  profileEmoji: string;

  @ApiProperty({
    required: false
  })
  nickname: string;

  @ApiProperty({
    required: false
  })
  lastBatteryPercentage: number;

  @ApiProperty({
    required: false
  })
  profilePicture: string;

  @ApiProperty({
    required: true
  })
  sex: Sex;
}
