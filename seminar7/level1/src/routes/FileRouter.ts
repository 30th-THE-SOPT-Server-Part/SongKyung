import { Router } from "express";
import { FileController } from "../controllers";
import upload from "../config/multer";

const router: Router = Router();

// router.post('/upload', upload.single('file'), FileController.uploadFileToS3);

// 여러개를 위해 single대신 array로 사용
router.post('/upload', upload.array('file'), FileController.uploadFilesToS3);

export default router;