import { Couple } from "./couple.model";
import { Mate } from "./mate.model";

export interface Message {
  id: string;
  value: string;
  privatePictureLink: string;
  date: Date;
  mate: Mate;
  couple: Couple;
}