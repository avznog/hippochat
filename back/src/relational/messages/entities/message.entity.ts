import { Couple } from "src/relational/couples/entities/couple.entity";
import { Mate } from "src/relational/mates/entities/mate.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, default: "" })
  value: string;

  @Column({ nullable: true })
  privatePictureLink: string;

  @Column({ nullable: false })
  date: Date;

  @ManyToOne(() => Mate, mate => mate.messages)
  mate: Mate;

  @ManyToOne(() => Couple, couple => couple.messages)
  couple: Couple;

}
