export interface PlacesModel {
  title: string;
  city?: string;
  country?: string;
  keywords?: string;
  selected?: boolean;
  timestamp?: number;
  coordonates?: {
    longitude: number;
    latitude: number;
  };
  photos?: string[];
}
