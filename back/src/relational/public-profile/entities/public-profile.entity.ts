import { Sex } from "src/constants/sex.type";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PublicProfile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  profileEmoji: string;

  @Column({ nullable: true })
  nickname: string;

  @Column({ nullable: true })
  lastBatteryPercentage: number;

  @Column({ nullable: true})
  profilePicture: string;

  @Column({ nullable: true })
  sex: Sex;
}
