import multer from "multer";
import multerS3 from "multer-s3";
import config from ".";
import s3 from "./s3Config";

const upload = multer({ //미들웨어로 사용할 multer 생성
    storage: multerS3({
        // 실질적인 storage는 multer s3를 사용한다.
        // 따라서 aws s3로 설정하고, s3 bucket name을 지정해준다.
        s3: s3, 
        bucket: config.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE, // multer가 알아서 지정할것
        acl: "public-read", // access control for the file
        key: function (req: Express.Request, file: Express.MulterS3.File, cb) {
            // bucket 내 이름이 겹치면, 동일 파일로 인식하기 때문에
            // 시간도 붙여줘서 이름이 같더라도 다른 파일로 저장하게 한다. 
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

export default upload;