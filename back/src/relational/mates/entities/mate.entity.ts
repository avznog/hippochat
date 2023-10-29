import { DaysEmoji } from "src/days-data/days-emojis/entities/days-emoji.entity";
import { DaysPicture } from "src/days-data/days-pictures/entities/days-picture.entity";
import { Couple } from "src/relational/couples/entities/couple.entity";
import { Invitation } from "src/relational/invitations/entities/invitation.entity";
import { Message } from "src/relational/messages/entities/message.entity";
import { PublicProfile } from "src/relational/public-profile/entities/public-profile.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mate {

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false, default: "" })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: "" })
  firstname: string;

  @Column({ nullable: false, default: "" })
  lastname: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: true })
  timezone: string;

  @ManyToOne(() => Couple, couple => couple.mates, { nullable: true })
  couple: Couple;

  @OneToOne(() => PublicProfile)
  @JoinColumn()
  publicProfile: PublicProfile;

  @OneToMany(() => DaysEmoji, daysEmoji => daysEmoji.mate)
  daysEmojis: DaysEmoji[];

  @OneToMany(() => DaysPicture, daysPictures => daysPictures.mate)
  daysPictures: DaysPicture[];

  @OneToMany(() => Message, message => message.mate)
  messages: Message[];

  @OneToMany(() => Invitation, invitation => invitation.asker)
  askedInvitations: Invitation[];

  @OneToMany(() => Invitation, invitation => invitation.receiver)
  receivedInvitations: Invitation[];
}
