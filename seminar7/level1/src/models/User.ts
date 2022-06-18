// User Collection 위치
import mongoose from 'mongoose';
import { UserInfo } from '../interfaces/user/UserInfo';

const UserSchema = new mongoose.Schema({
    /*
    type: field type 지정
    required: 필수 field 인가?
    unique: 고유한 값인가?
    */
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // 중복불가
    },
    password:{
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    school: {
        // 중첩 document
        name: { type: String },
        major: { type: String },
    },
});

//UserSchema를 User라는 이름으로 내보내겠다
export default mongoose.model<UserInfo & mongoose.Document>('User', UserSchema);
