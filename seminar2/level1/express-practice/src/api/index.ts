import express, { Router } from 'express';

const router: Router = express.Router(); //express 라우팅 시스템을 받아올 것

router.use('/user', require('./user'));
// use: /???/user/ 엔드포인트로 요청이 들어오면 user.ts 파일을 실행해라
//localhost:8000/api/user -> user 파일로

module.exports = router; // 모듈로 반환