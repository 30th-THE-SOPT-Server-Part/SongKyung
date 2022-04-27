import { SchoolInfo } from "../school/SchoolInfo";

// 전체가 수정되는게 아니니까 모든 항목 optional
export interface UserUpdateDto{
    name?: string;
    phone?: string;
    email?: string;
    age?: number;
    school?: SchoolInfo;
}