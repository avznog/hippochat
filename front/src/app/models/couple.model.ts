import { Mate } from "./mate.model";

export interface Couple {
  id: string;
  name: string;
  mates: Mate[];
}