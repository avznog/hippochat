import { Couple } from "./couple.model";
import { PublicProfile } from "./public-profile.model";
import { Sadness } from "./sadness.model";

export interface Mate {
  id: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
  publicProfile: PublicProfile;
  couple: Couple;
}