import { PublicProfile } from "./public-profile.model";

export interface Sadness {
  id: string;
  date: Date;
  publicProfile: PublicProfile;
}