// Object 객체 타입
const sopt = {
    season: 30,
    group: ['YB','OB'],
    part: ['서버','기획','디자인','안드'],
    president: '김규민',
    introduce: function(){
        this.part.map(name => {
            console.log(`솝트 내 파트는 ${name} 파트가 있어요`)
        });

    }
}

console.log(sopt.group);

//Array
let array = [1, 2, true, 'string'];
console.log(array);

let array2 =[
    {
        name:'김',
        age: 5
    },
    {
        name: '박',
        age: 15
    },
];

console.log(array2);
console.log(array2[0]);
console.log(typeof array)

//function 
//함수 선언식
function menu(dinner){
    return `오늘 메뉴는 ${dinner} 입니다`
}
const str = menu('삼겹살');
console.log(str);

//함수 표현식
const menu2 = (dinner) =>{
    return `오늘 메뉴는 ${dinner} 입니다.`;
}
const str2 = menu2('곱창');
console.log(str2);

//function 파라메터 전달
const func = (num) =>{
    return num*num;
}

const multiple = (func,num) =>{
    console.log(func(num));
}

multiple(func,3)

//증감 연산자
let a = 2;
let b = a++;
console.log(b,a);

let c = 2;
let d = ++c;
console.log(c,d);

// === : 타입까지 비교, == : 값만 비교
let num1 = 2+3;
let num2 = 5;
if (num1 === num2){
    console.log('num1===num2');
}

let str1 = '5';
if(num1 == str1){
    console.log('num1==str1');
}

let up = 6;
let down = 2;
if (up % down == 0){
    console.log('나머지 '+(up%down));
}

//and or
num1 = 5;
num2 = 2;
if(num1===5 && num2===2){
    console.log('and true!');
}

if( typeof num1 == 'number'){
    console.log('num1 == Number');
}

function biggerthan10(num3){
    for (var i = 1; i<10;i++){
        num3 += i
        console.log(num3)
        if (num3 >=10){
            console.log('10부다크다')
        }
    }
}

let start = 6
biggerthan10(6)