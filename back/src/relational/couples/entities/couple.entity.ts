import { Mate } from "src/relational/mates/entities/mate.entity";
import { Message } from "src/relational/messages/entities/message.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Couple {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  name: string;

  @OneToMany(() => Mate, mate => mate.couple, { nullable: true })
  mates: Mate[];

  @OneToMany(() => Message, message => message.couple)
  messages: Message[];
}
