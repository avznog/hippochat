export interface UpdatePublicProfileDto {
  profileEmoji?: string;
  lastBatteryPercentage?: string | null;
  lastLocation?: string | null;
  nickname?: string;
  description?: string;
  preferedColor?: string;
}