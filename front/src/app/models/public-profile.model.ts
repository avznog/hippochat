import { Sex } from "../constants/sex.type";
import { Sadness } from "./sadness.model";

export interface PublicProfile {
  id: string;
  description: string;
  profileEmoji: string;
  nickname: string;
  lastBatteryPercentage: string;
  profilePicture: string;
  sex: Sex;
  preferedColor: string;
  sadness: Sadness[];
}