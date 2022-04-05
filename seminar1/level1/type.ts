export{};
let isDone: boolean = true;
const name: string = '유송경';
console.log(name)
let grade: number = 4;
const sum = (x:number, y:number): number =>{
    return x*y;
}

/*
배열 선언
const variable: Type[] = 초기값; T[]
let variable: Array<Type>= 초기값;
*/
const ages1: number[] = [1,2,3,4,5];
const ages2: Array<number> = [1,2,3,4];

/*
Object vs object
Object 는 자바스크립트의 모든 생성자를 extend
즉, 자바스크립트의 모든 타입이 할당될 수 있다!
object 는 원시 타입을 제외한 나머지를 모두 받을 수 있다!
*/
const f1 = (obj: object): void =>{
    console.log(obj);
}
f1([1,2,3,4]);
// f1('hihi'); -> 오류

const f2 = (obj: Object): void =>{
    console.log(obj);
}

f2([1,2,3,4]);
f2('hihi');

// 함수 반환값 명시
const div = (x:number, y:number): number =>{
    return x/y;
}

/* 
타입 단언 
개발자는 뭘 하고 있는지 아니가 타스에게 알려주는 개념!
*/
// angle-bracket 타입단언
let name3: any = '채정아';
let name3Length: number = (<string>name3).length; // aka 형변환
console.log(name3Length);

// as 타입단언
let name4: any = '서버';
let name4Length: number = (name4 as string).length;
console.log(name4Length)
