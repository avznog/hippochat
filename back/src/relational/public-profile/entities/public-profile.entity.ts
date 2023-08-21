import { Sex } from "src/constants/sex.type";
import { Sadness } from "src/relational/sadness/entities/sadness.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
  lastBatteryPercentage: string;

  @Column({ nullable: true})
  profilePicture: string;

  @Column({ nullable: true })
  sex: Sex;

  @Column({nullable: false, default: "#3880ff"})
  preferedColor: string;

  @OneToMany(() => Sadness, sadness => sadness.publicProfile)
  sadness: Sadness;
}
