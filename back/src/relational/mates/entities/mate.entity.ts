import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
