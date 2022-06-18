import mongoose from 'mongoose';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { MovieCommentCreateDto } from '../interfaces/movie/MovieCommentCreateDto';
import { MovieCommentUpdateDto } from '../interfaces/movie/MovieCommentUpdateDto';
import { MovieCreateDto } from '../interfaces/movie/MovieCreateDto';
import { MovieCommentInfo, MovieInfo } from '../interfaces/movie/MovieInfo';
import { MovieResponseDto } from '../interfaces/movie/MovieResponseDto';
import { MovieUpdateDto } from '../interfaces/movie/MovieUpdateDto';
import { MovieOptionType } from '../interfaces/movie/MovieOptionType';
import Movie from '../models/Movie';
import { MoviesResponseDto } from '../interfaces/movie/MoviesResponseDto';

const createMovie = async (
    movieCreateDto: MovieCreateDto,
): Promise<PostBaseResponseDto> => {
    try {
        const movie = new Movie({
            title: movieCreateDto.title,
            director: movieCreateDto.director,
            startDate: movieCreateDto.startDate,
            thumbnail: movieCreateDto.thumbnail,
            story: movieCreateDto.story,
        });
        await movie.save();
        const data = {
            _id: movie.id,
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const createMovieComment = async (
    movieId: string,
    movieCommentCreateDto: MovieCommentCreateDto,
): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        // 영화정보 없는경우
        if (!movie) return null;

        const newComments: MovieCommentInfo[] = [
            ...movie.comments,
            movieCommentCreateDto,
        ];

        //코멘트를 넣고 새로 업데이트
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { comments: newComments },
            { new: true },
        );
        if (!updatedMovie) return null;

        return updatedMovie;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateMovie = async (movieId: string, movieUpdateDto: MovieUpdateDto) => {
    try {
        //findByIdAndUpdate 함수 사용할 것
        // createUser에서 한거 처럼 일일이 넣어줘도 되긴 함
        await Movie.findByIdAndUpdate(movieId, movieUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const findMovieById = async (
    movieId: string,
): Promise<MovieResponseDto | null> => {
    try {
        const movie = await Movie.findById(movieId).populate(
            'comments.writer',
            'name',
        );
        if (!movie) {
            return null;
        }
        return movie;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getMovie = async (): Promise<MovieResponseDto[] | null> => {
    try {
        const movies = await Movie.find({});

        if (movies.length === 0) {
            return null;
        }
        return movies;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteMovie = async (movieId: string): Promise<void> => {
    try {
        await Movie.findByIdAndDelete(movieId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateMovieComment = async (
    movieId: string,
    commentId: string,
    userId: string,
    commentUpdateDto: MovieCommentUpdateDto,
): Promise<MovieInfo | null> => {
    try {
        const movie = await Movie.findById(movieId);
        if (!movie) return null;

        const data = await Movie.findOneAndUpdate(
            {
                _id: movieId,
                comments: { $elemMatch: { _id: commentId, writer: userId } },
            },
            {
                $set: {
                    // $set: 수정사항
                    'comments.$.writer': userId,
                    'comments.$.comment': commentUpdateDto.comment,
                },
            },
            { new: true },
        ); // 업데이트 된 후의 document를 반환해준다.

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getMoviesBySearch = async (
    page: number,
    search?: string,
    option?: MovieOptionType,
): Promise<MoviesResponseDto[]> => {
    const regex = (pattern: string) => new RegExp(`.*${pattern}.*`); // 몽고디비는 .*ㅇㄻㅇㄹ.* 을 사용하여 검색한다

    let movies: MovieInfo[] = [];

    const perPage: number = 2; // 페이지 당 데이터 수

    try {
        if (search && option) {
            const searchRegex: RegExp = regex(search);

            if (option === 'title') {
                // title에서 검색
                movies = await Movie.find({ title: { $regex: searchRegex } })
                    .sort({ createAt: -1 }) // 최신순 정렬
                    .skip(perPage * (page - 1)) // 만약 3번째 페이지를 검색하려면, 2 * 2 개를 건너뛰게한다.
                    .limit(perPage); // 한페이지 당 parPage개 씩 ;
            } else if (option === 'director') {
                // director에서 검색
                movies = await Movie.find({ director: { $regex: searchRegex } })
                    .sort({ createAt: -1 }) // 최신순 정렬
                    .skip(perPage * (page - 1)) // 만약 3번째 페이지를 검색하려면, 2 * 2 개를 건너뛰게한다.
                    .limit(perPage); // 한페이지 당 parPage개 씩 ;
            } else {
                // title, director 에서 검색
                movies = await Movie.find({
                    $or: [
                        { director: { $regex: searchRegex } },
                        { title: { $regex: searchRegex } },
                    ],
                })
                    .sort({ createAt: -1 }) // 최신순 정렬
                    .skip(perPage * (page - 1)) // 만약 3번째 페이지를 검색하려면, 2 * 2 개를 건너뛰게한다.
                    .limit(perPage); // 한페이지 당 parPage개 씩 ;
            }
        } else {
            movies = await Movie.find({})
                .sort({ createAt: -1 }) // 최신순 정렬
                .skip(perPage * (page - 1)) // 만약 3번째 페이지를 검색하려면, 2 * 2 개를 건너뛰게한다.
                .limit(perPage); // 한페이지 당 parPage개 씩 ;;
        }
        // 클라에게 넘겨줄 마지막 페이지도 계산해주자
        const total: number = await Movie.countDocuments({});
        const lastPage: number = Math.ceil(total / perPage);

        const data = {
            movies,
            lastPage,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createMovie,
    updateMovie,
    findMovieById,
    deleteMovie,
    createMovieComment,
    updateMovieComment,
    getMovie,
    getMoviesBySearch,
};
