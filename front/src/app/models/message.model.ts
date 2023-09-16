import { Couple } from "./couple.model";
import { Mate } from "./mate.model";

export interface Message {
  id: string;
  value: string;
  privatePicture: string;
  date: Date;
  privatePictureOpened: boolean;
  mate: Mate;
  couple: Couple;
}