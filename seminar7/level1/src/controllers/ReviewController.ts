import express, { Request, Response } from 'express';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { validationResult } from 'express-validator';
import { ReviewCreateDto } from '../interfaces/review/ReviewCreateDto';
import ReviewService from '../services/ReviewService';
import { ReviewOptionType } from '../interfaces/review/ReviewOptionType';
/**
 * @route POST /review/movies/:movieId
 * @desc Create Review
 * @access Public
 */

const createReview = async (req: Request, res: Response) => {
    // body 검사에 대한 result가 들어온다.
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // error 가 있다면(비어있지 않다면)
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const reviewCreateDto: ReviewCreateDto = req.body;
    const { movieId } = req.params;
    try {
        const data = await ReviewService.createReview(movieId, reviewCreateDto);

        res.status(statusCode.CREATED).send(
            util.success(
                statusCode.CREATED,
                message.CREATE_REVIEW_SUCCESS,
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
 *  @route GET /review/movies/:movieId
 *  @desc Get Review
 *  @access Public
 */
const getReviews = async (req: Request, res: Response) => {
    const { movieId } = req.params;

    try {
        const data = await ReviewService.getReviews(movieId);

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_REVIEW_SUCCESS, data),
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
 * @route GET /review?search=&option=&page=
 * @desc search review 
 * @access public
 */
const getReviewsBySearch = async(req:Request, res:Response)=>{
    const {movieId} = req.params;
    const {search,option} = req.query;
    const isOptionType = (option: string): option is ReviewOptionType => {
        return ["title", "content", "title_content"].indexOf(option) !== -1;
    } 
    
    if (!isOptionType(option as string)) { // 우리가 정한 option이 아닌 넘이 넘어오면 Bad Request
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }

    const page: number = Number(req.query.page || 1);
    
    try{
        const data = await ReviewService.getReviewsBySearch(movieId,search as string, option as ReviewOptionType, page); // search 타입은 string
        
        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.SEARCH_REVIEW_SUCCESS, data));
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
    createReview,
    getReviews,
    getReviewsBySearch,
};
