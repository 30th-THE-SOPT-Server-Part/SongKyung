import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import { FileService } from "../services";

// multer upload 미들웨어에서 s3에 저장된 파일 주소는 req.file.location에 위치함
// 미들웨어 만든거 넣어주고, 파일 주소를 저장만 해주면 된다.
const uploadFileToS3 = async (req: Request, res: Response) => {
    if (!req.file) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.NULL_VALUE));

    const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
    // image에서 name,location 받아오기
    const { originalname, location } = image;

    try {
        const data = await FileService.createFile(location, originalname);
        res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_FILE_SUCCESS, data));
    } catch (error) {
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
}
export default{
    uploadFileToS3,
}