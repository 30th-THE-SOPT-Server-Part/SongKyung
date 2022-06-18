import express, { Request, Response } from 'express';
import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import statusCode from '../modules/statusCode';
import message from '../modules/responseMessage';
import util from '../modules/util';
import { UserService } from '../services';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { UserSignInDto } from '../interfaces/user/UserSignInDto';
import { validationResult } from 'express-validator';
import getToken from '../modules/jwtHandler';

/**
 *  @route POST /user/signin
 *  @desc signin User
 *  @access Public
 */
 const signInUser = async (req: Request, res: Response) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    const userSignInDto: UserSignInDto = req.body;
    
    try {
        const result = await UserService.signInUser(userSignInDto);
        // 404,401 예외 처리
        if (!result) return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        else if (result === 401) return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD));

        //로그인 후 accessToken반환
        const accessToken = getToken((result as PostBaseResponseDto)._id);

        const data = {
            _id: (result as PostBaseResponseDto)._id,
            accessToken
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data));
    } catch (e) {
        console.log(error);
        // 서버 내부에서 오류 발생
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
    const UserCreateDto: UserCreateDto = req.body; // User Create Dto 로 req.body 받아옴
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res
            .status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));
    }
    try {
        const result = await UserService.createUser(UserCreateDto);
        if (!result)
            // 유저 중복 확인
            return res
                .status(statusCode.CONFLICT)
                .send(util.fail(statusCode.CONFLICT, message.DUPLICATED));

        // 아까 만든 jwtHandler.ts내 getToken을 통해 access token 받아와 전달하기
        const accessToken = getToken(result._id);

        const data = {
            _id: result._id,
            accessToken,
        };

        res.status(statusCode.CREATED).send(
            util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data),
        );
        // res.status(XXX).send(json)
        // .status: status code를 정수로 입력
        // .send(json): json형식으로 response body에 입력한다. 통일된 형식을 유지해야한다.
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
 *  @route PUT /user/:userId
 *  @desc Update User
 *  @access Public
 */
const updateUser = async (req: Request, res: Response) => {
    const userUpdateDto: UserUpdateDto = req.body; // DTO 사용
    const { userId } = req.params; // route에서 userId를 받아온다.

    try {
        await UserService.updateUser(userId, userUpdateDto);
        // UserService 에서

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
 *  @route GET /user/:userId
 *  @desc Read User
 *  @access Public
 */
const findUserById = async (req: Request, res: Response) => {
    const { userId } = req.params; // route에서 userId를 받아온다.

    try {
        const data = await UserService.findUserById(userId);

        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(
            util.success(statusCode.OK, message.READ_USER_SUCCESS, data),
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
 *  @route DELETE /user/:userId
 *  @desc Delete User
 *  @access Public
 */
const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params; // route에서 userId를 받아온다.

    try {
        await UserService.deleteUser(userId);
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

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
    signInUser,
};
