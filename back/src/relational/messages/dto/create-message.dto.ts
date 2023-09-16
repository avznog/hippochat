import { Couple } from "src/relational/couples/entities/couple.entity";
import { Mate } from "src/relational/mates/entities/mate.entity";

export class CreateMessageDto {
  value: string;
  privatePictureLink: string;
  date: Date;
  mate: Mate;
  couple: Couple;
}
