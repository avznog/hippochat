import { Mate } from "./mate.model";

export interface DaysPicture {
  id: string;
  date: string;
  value: string;
  mate: Mate;
}