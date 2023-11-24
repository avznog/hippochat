import { Couple } from "./couple.model";
import { DaysEmoji } from "./days-emoji.model";
import { DaysPicture } from "./days-picture.model";
import { Invitation } from "./invitation.model";
import { Message } from "./message.model";
import { PublicProfile } from "./public-profile.model";

export interface Mate {
  id: string;
  pseudo: string;
  password: string;
  firstname: string;
  lastname: string;
  age: number;
  timezone: string;
  daysEmojis: DaysEmoji[];
  daysPictures: DaysPicture[];
  publicProfile: PublicProfile;
  messages: Message[];
  couple: Couple;
  askedInvitations: Invitation[];
  receivedInvitations: Invitation[];
}