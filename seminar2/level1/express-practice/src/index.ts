import express, { Request, Response, NextFunction } from 'express';

const app = express(); // express 객체 받아오기

app.use(express.json()); // express에서 request body를 json으로 요청을 주고 받을 것임

app.use('/api', require('./api')); 
// use: 모든요청에 대해
//localhost:8000/api -> api 폴더에서 반환된 router로
//localhost:8000/api/user -> user 파일로

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hi! My name is ssong!!!');
}); // get은 http method 라고 생각 app.post, app.put... 다 가능

app.listen('8000', () => {
    console.log(`
        #############################################
            💖 Server listening on port: 8000 💖
        #############################################
    `);
}); // 8000번 포트에서 서버를 실행할 것.
