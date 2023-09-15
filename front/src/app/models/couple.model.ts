import { Mate } from "./mate.model";
import { Message } from "./message.model";

export interface Couple {
  id: string;
  name: string;
  messages: Message[];
  mates: Mate[];
}