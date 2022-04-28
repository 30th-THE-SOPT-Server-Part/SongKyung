import express, { Request, Response, NextFunction } from 'express';

const app = express(); // express 객체 받아오기

app.use(express.json()); // express에서 request body를 json으로 요청을 주고 받을 것임

app.use('/api', require('./api')); 

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('2차세미나 심화과제');
}); // get은 http method 라고 생각 app.post, app.put... 다 가능

app.listen('8000', () => {
    console.log(`
        #############################################
            💖 Server listening on port: 8000 💖
        #############################################
    `);
}); // 8000번 포트에서 서버를 실행할 것.
