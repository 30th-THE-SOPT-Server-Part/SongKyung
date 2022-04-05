/*
interface
타입 체크를 위해 여러가지 프로퍼티를 갖는 새로운 타입 정의
변수, 함수, 클래스 모두 사용 가능
interface Name {
 ...
 property: T;   
}
*/

interface ServerPart{
    name:string;
    age: number;
    group: string;
    mbti?: string[]; // 선택적 프로퍼티!!
}

const serverPart: ServerPart = {
    name:'유송경',
    age: 5,
    group: 'YB',
    mbti: ['E','F']
}
    
const serverMembers: ServerPart[] = [
    {
        name:'유송경',
        age: 5,
        group: 'YB',
        mbti: ['E','F']
    },
    {
        name:'유송',
        age: 15,
        group: 'B'
        //선택적
    }
]

console.log(serverPart);
console.log(serverMembers[1]);

