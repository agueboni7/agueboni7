export interface Place
{
    titre: string;
    city?: string;
    country?: string;
    keywords?: string;
    timestamp?: number;
    selected?: boolean;
    coordonates?: {
        longitude: number;
        latitude: number;
    };
    photo?: string[];
}
