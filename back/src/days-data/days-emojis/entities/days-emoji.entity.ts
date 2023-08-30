import { Mate } from "src/relational/mates/entities/mate.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DaysEmoji {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false, default: new Date(), type: "date"})
  date: string;

  @Column({nullable: true})
  value: string;

  @ManyToOne(() => Mate, mate =>  mate.daysEmojis)
  mate: Mate;
}
