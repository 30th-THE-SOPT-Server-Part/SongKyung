import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { MovieCreateDto } from '../interfaces/movie/MovieCreateDto';
import { MovieResponseDto } from '../interfaces/movie/MovieResponseDto';
import { MovieUpdateDto } from '../interfaces/movie/MovieUpdateDto';
import Movie from '../models/Movie';

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
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return null;
        }
        return movie;
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

export default {
    createMovie,
    updateMovie,
    findMovieById,
    deleteMovie,
};
