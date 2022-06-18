import mongoose from "mongoose";
import { ReviewInfo } from "../interfaces/review/ReviewInfo";

const ReviewSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User" 
        // id를 직접 참조하는 reference 방식임을 지정
    },
    movie: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Movie"
        // id를 직접 참조하는 reference 방식임을 지정
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    }
});

export default mongoose.model<ReviewInfo & mongoose.Document>("Review", ReviewSchema);