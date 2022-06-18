import { MovieInfo } from "../movie/MovieInfo";

export interface ReviewResponseDto {
    writer: string;
    movie: MovieInfo;
    // movie는 movie에 대한 모든 정보 조회
    title: string;
    content: string;
}