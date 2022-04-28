// 변수 타입 확인
const name = '장서';
console.log(typeof name);

let age = 18;
console.log(typeof age);

let server = true;
console.log(typeof server);

//이름은 {} 나이는 {}살
console.log(`이름은 ${name} 나이는 ${age}`)

//null,undefined
console.log(typeof null);
console.log(typeof undefined);

//Array.map
let num = [1,2,3];
const newNumArr = num.map(x => x *2);
console.log(newNumArr);

newNumArr.map(x => {
    console.log(x);
})

for (const x of newNumArr){
    console.log(x);
}