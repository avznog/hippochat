import { Couple } from "src/relational/couples/entities/couple.entity";
import { PublicProfile } from "src/relational/public-profile/entities/public-profile.entity";
import { Sadness } from "src/relational/sadness/entities/sadness.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mate {

  @PrimaryGeneratedColumn("uuid")
  id: string
  
  @Column({ nullable: false, default: "" })
  email: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false, default: ""})
  firstname: string;

  @Column({nullable: false, default: ""})
  lastname: string;

  @Column({nullable: false})
  age: number;

  @ManyToOne(() => Couple, couple => couple.mates, { nullable: true })
  couple: Couple;

  @OneToOne(() => PublicProfile)
  @JoinColumn()
  publicProfile: PublicProfile;
}
