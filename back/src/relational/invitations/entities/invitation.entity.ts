import { Mate } from "src/relational/mates/entities/mate.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  denied: boolean;

  @ManyToOne(() => Mate, asker => asker.askedInvitations)
  asker: Mate;

  @ManyToOne(() => Mate, receiver => receiver.receivedInvitations)
  receiver: Mate;
}
