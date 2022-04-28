import express, { Request, Response, Router } from 'express';
// express 모듈에서 express, (request, response, router)-> 타입정의를 위해 불러온다.

const router: Router = express.Router(); // express의 라우팅 시스템

// 여기서는 routing을 할 것이기 때문에 index에서 처럼 
// express를 받아온 app이 아닌 router로 받아준다
router.get('/', (req: Request, res: Response) => { 
    return res.status(200).json({
        status: 200,
        message: '유저 조회 성공'
    });
});

module.exports = router; //  생성한 router 객체를 모듈로 반환