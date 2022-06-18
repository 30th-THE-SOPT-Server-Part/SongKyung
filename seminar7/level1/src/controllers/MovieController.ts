import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { MovieCreateDto } from '../interfaces/movie/MovieCreateDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { MovieService } from '../services';
import { MovieUpdateDto } from '../interfaces/movie/MovieUpdateDto';
import { MovieCommentCreateDto } from '../interfaces/movie/MovieCommentCreateDto';
import Movie from '../models/Movie';
import { MovieOptionType } from '../interfaces/movie/MovieOptionType';
import { MovieCommentUpdateDto } from '../interfaces/movie/MovieCommentUpdateDto';
/**
 *  @route POST /movie
 *  @desc Create movie
 *  @access Public
 */
const createMovie = async (req: Request, res: Response) => {
    const MovieCreateDto: MovieCreateDto = req.body;
    try {
        const data: PostBaseResponseDto = await MovieService.createMovie(
            MovieCreateDto,
        );
        res.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATE_MOVIE_SUCCESS,
                data,
            ),
        );
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route PUT /movie/:movieId
 *  @desc Update Movie
 *  @access Public
 */
const updateMovie = async (req: Request, res: Response) => {
    const movieUpdateDto: MovieUpdateDto = req.body;
    const { movieId } = req.params;
    console.log('📍📍📍📍' + movieId);

    try {
        await MovieService.updateMovie(movieId, movieUpdateDto);
        res.status(statusCode.NO_CONTENT).send();
        // 해당 값이 없다면 204 NO CONTENT
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route GET /movie/:movieId
 *  @desc Read Movie
 *  @access Public
 */
const findMovieById = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await MovieService.findMovieById(movieId);

        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_MOVIE_SUCCESS, data),
        );
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route GET /movie
 *  @desc Get All Movies
 *  @access Public
 */
const getMovie = async (req: Request, res: Response) => {
    try {
        const data = await MovieService.getMovie();
        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }
        return res
            .status(statusCode.OK)
            .send(util.success(statusCode.OK, message.GET_MOVIE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route DELETE /movie/:movieId
 *  @desc Delete Movie
 *  @access Public
 */
const deleteMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params; // route에서 userId를 받아온다.

    try {
        await MovieService.deleteMovie(movieId);
        return res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        //서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route POST /movie/:movieId/comment
 *  @desc Create Movie Comment
 *  @access Public
 */
const createMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const movieCommentCreateDto: MovieCommentCreateDto = req.body;
    const { movieId } = req.params;

    try {
        const data = await MovieService.createMovieComment(
            movieId,
            movieCommentCreateDto,
        );
        if (!data)
            res.status(statusCode.NOT_FOUND).send(
                util.fail(statusCode.NOT_FOUND, message.NOT_FOUND),
            );

        res.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATE_MOVIE_COMMENT_SUCCESS,
                data,
            ),
        );
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 *  @route PUT /movie/:movieId/comments/:commentId
 *  @desc Update Movie Comment
 *  @access Public
 */
const updateMovieComment = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const commentUpdateDto: MovieCommentUpdateDto = req.body;
    const { movieId, commentId } = req.params;

    try {
        const data = await MovieService.updateMovieComment(
            movieId,
            commentId,
            req.body.user.id,
            commentUpdateDto,
        );

        if (!data)
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));

        res.status(statusCode.NO_CONTENT).send();
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );
    }
};

/**
 * @route GET /movie?search=&option=&page=
 * @desc update movie comment
 * @access public
 */
const getMoviesBySearch = async (req: Request, res: Response) => {
    const { search,option } = req.query;
    const isOptionType = (option: string): option is MovieOptionType => {
        return ["title", "director", "title_director"].indexOf(option) !== -1;
    } //-1이면 저안에 없는 것임

    if (!isOptionType(option as string)) { // 우리가 정한 option이 아닌 넘이 넘어오면 Bad Request
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const page: number = Number(req.query.page || 1);

    try{
        const data = await MovieService.getMoviesBySearch(search as string, option as MovieOptionType, page); // search 타입은 string
        
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.SEARCH_MOVIE_SUCCESS, data));
    }catch(error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(
            util.fail(
                statusCode.INTERNAL_SERVER_ERROR,
                message.INTERNAL_SERVER_ERROR,
            ),
        );

    }
}

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
