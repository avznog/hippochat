import { Sex } from "../constants/sex.type";

export interface PublicProfile {
  id: string;
  description: string;
  profileEmoji: string;
  nickname: string;
  lastBatteryPercentage: number;
  profilePicture: string;
  sex: Sex;
}