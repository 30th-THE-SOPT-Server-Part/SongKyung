import { MovieInfo } from "./MovieInfo";

export interface MovieCreateDto{
    title: string;
    director: string;
    startDate: Date;
    thumbnail: String;
    story: String;
}