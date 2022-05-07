// User Collection 위치
import mongoose from 'mongoose';
import { BlogInfo } from '../interfaces/blog/BlogInfo';

const BlogSchema = new mongoose.Schema({
    /*
    type: field type 지정
    required: 필수 field 인가?
    unique: 고유한 값인가?
    */
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        name: { type: String },
        subcategory: { type: String },
    },
});

//BlogSchema를 Blog라는 이름으로 내보내겠다
export default mongoose.model<BlogInfo & mongoose.Document>('Blog', BlogSchema);
