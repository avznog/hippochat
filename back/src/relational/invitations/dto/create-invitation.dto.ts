import { Mate } from "src/relational/mates/entities/mate.entity";

export class CreateInvitationDto {
  receiver: Mate;
  asker: Mate;
}
