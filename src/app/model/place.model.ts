export interface Place
{
    title: string;
    city?: string;
    country?: string;
    keyword?: string;
    timestamp?: number;
    selected?:boolean;
    coordonates?:{
        longitude:number,
        latitude: number,
    }
    photo?: string[];
}