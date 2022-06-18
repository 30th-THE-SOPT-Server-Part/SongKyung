import { MovieInfo } from '../movie/MovieInfo'

export interface MovieUpdateDto{
    title?:string;
    director?:string;
    startDate?:Date;
    thumbnail?:string;
    story?:string;
}