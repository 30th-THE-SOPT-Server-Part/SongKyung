import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { MovieCreateDto } from '../interfaces/movie/MovieCreateDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { MovieService } from '../services';
import { MovieUpdateDto } from '../interfaces/movie/MovieUpdateDto';

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
            util.success(statusCode.CREATED, message.CREATE_MOVIE_SUCCESS, data),
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
const updateMovie = async (req:Request, res:Response)=>{
    const movieUpdateDto : MovieUpdateDto = req.body;
    const { movieId } = req.params;

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
}

/**
 *  @route GET /movie/:movieId
 *  @desc Read Movie
 *  @access Public
 */
const findMovieById = async(req:Request, res:Response)=>{
    const {movieId} = req.params;

    try{
        const data = await MovieService.findMovieById(movieId);

        if(!data){
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
}

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

export default{
    createMovie,
    updateMovie,
    findMovieById,
    deleteMovie,
}