import { SchoolInfo } from '../school/SchoolInfo';

export interface UserInfo {
    //이름,핸드폰,이메일,학교
    name: string;
    phone: string;
    email: string;
    password: string;
    age: number;
    school: SchoolInfo;
    //school(학교이름, 전공)
    // scool:{
    //     name: string;
    //     major: string;
    // }
    // 로 해도 되지만, 기능별로 세분화하자
}
