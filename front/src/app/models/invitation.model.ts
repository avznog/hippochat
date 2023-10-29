import { Mate } from "./mate.model";

export interface Invitation {
  id: string;
  denied: boolean | null;
  asker: Mate;
  receiver: Mate;
}