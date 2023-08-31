import { Mate } from "src/relational/mates/entities/mate.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DaysPicture {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false, default: new Date(), type: "date"})
  date: string;

  @Column({nullable: false, default: ""})
  value: string;

  @ManyToOne(() => Mate, mate => mate.daysPictures)
  mate: Mate;

}
