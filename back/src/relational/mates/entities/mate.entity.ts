import { Couple } from "src/relational/couples/entities/couple.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => Couple, couple => couple.mates)
  couple: Couple;

}
