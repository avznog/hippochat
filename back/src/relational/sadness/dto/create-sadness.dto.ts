import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { Mate } from "src/relational/mates/entities/mate.entity";
import { PublicProfile } from "src/relational/public-profile/entities/public-profile.entity";

export class CreateSadnessDto {
  @ApiProperty({
    type: "Date",
    required: true,
    description: "Date du tristoune"
  })
  @IsDate()
  date: Date;

  @ApiProperty({
    required: true,
    description: "PublicProfile lié"
  })
  publicProfile: PublicProfile;
}
