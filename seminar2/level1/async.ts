// // callback
// console.log('안녕하세요');

// setTimeout(()=>{0
//     console.log('Set Time out');
// },2000); // ->2초

// console.log('끝');


// // promise
// const condition: boolean = false;

// const promise = new Promise((resolve, reject)=>{
//     if(condition){
//         resolve('성공');
//     }else{
//         reject(new Error('reject!! error'));
//     }
// });

// //작업성공시) resolve()가 정상적으로 실행된 상태. then으로 전달
// //작업실패시) reject()가 실행. catch로 전달
// promise
//     .then((resolveData): void => {
//         console.log(resolveData);
//     })
//     .catch(error => console.log(error));


// // promise chaining
// const restaurant = (callback: () => void, time: number) => {
//     setTimeout(callback, time);
// }

// const order = (): Promise<string> =>{
//     return new Promise ((resolve, reject)=>{
//         restaurant(()=>{
//             console.log('[레스토랑 진행상황 - 음식주문]');
//             resolve('음식 주문 시작');
//         },1000);
//     });
// }

// const cook = (progress: string): Promise<string> => {
//     return new Promise((resolve, reject)=>{
//         restaurant(()=>{
//             console.log('[레스토랑 진행상황 - 음식조리중]');
//             resolve(`${progress} -> 음식 조리 중`);
//         },2000);
//     });
// }

// const serving = (progress: string): Promise<string> =>{
//     return new Promise((resolve, reject)=>{
//         restaurant(()=>{
//             console.log('[레스토랑 진행상황 - 음식서빙중]');
//             resolve(`${progress} -> 음식 서빙 중`);
//         },2500);
//     });
// }

// const eat = (progress: string): Promise<string> =>{
//     return new Promise((resolve,reject)=>{
//         restaurant(()=>{
//             console.log('[레스토랑 진행상황 - 음식먹는중]');
//             resolve(`${progress} -> 음식 먹는 중`);
//         },3000);
//     });
// }

// order().then(progress => cook(progress))
//     .then(progress => serving(progress))
//     .then(progress => eat(progress))
//     .then(progress => console.log(progress))
//     .catch; // promise가 여러개 여도 단일 catch 로 error 잡을 수 있다!


// Promise.resolve(123)
//     .then(res =>{
//         throw new Error('에러 발생');
//         return 456;
//     })
//     .then(res =>{
//         console.log(res); //절대 실행되지 않음
//         return Promise.resolve(789);
//     })
//     .catch(error =>{
//         console.log(error.message);
//     })

    
//async await
let asyncFunc1 = (msg: string): Promise<string>=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(`asyncFunc1 - ${msg}`);
        },1000);
    });
}

let asyncFunc2 = (msg:string): Promise<string>=>{
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve(`asyncFunc2 - ${msg}`);
        },1500);
    })
}

// // 함수명, 인자 string Promise<string> 반환
// let promiseMain1 = (): void =>{
//     asyncFunc1('server part1').then((result:string)=>{
//         console.log(result);
//         return asyncFunc2('server part2');
//     }).then((result:string)=>{
//         console.log(result);
//     });
// }

// 위의 promise chaining을 async, await으로 바꿔보자!

const asyncMain = async() => {
    let result = await asyncFunc1('server part');
    console.log(result);
    result = await asyncFunc2('server part2');
    console.log(result);
}

asyncMain()