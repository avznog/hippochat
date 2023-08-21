import { Mate } from "src/relational/mates/entities/mate.entity";
import { PublicProfile } from "src/relational/public-profile/entities/public-profile.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sadness {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  date: Date;

  @ManyToOne(() => PublicProfile, publicProfile => publicProfile.sadness)
  publicProfile: PublicProfile;
}
