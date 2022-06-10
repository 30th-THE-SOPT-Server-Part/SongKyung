import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { ReviewCreateDto } from '../interfaces/review/ReviewCreateDto';
import { ReviewResponseDto } from '../interfaces/review/ReviewResponseDto'
import Review from '../models/Review';

const createReview = async (
    movieId: string,
    reviewCreateDto: ReviewCreateDto,
): Promise<PostBaseResponseDto> => {
    try {
        const review = new Review({
            title: reviewCreateDto.title,
            content: reviewCreateDto.content,
            writer: reviewCreateDto.writer,
            movie: movieId, // reference는 ObjectId를 그대로 저장
        });

        await review.save();

        const data = {
            _id: review._id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getReviews = async (movieId: string): Promise<ReviewResponseDto[]> => {
    try {
        // 걍 find를 하면 ObjectId가 반환될 것.
        // 해당 Id의 특정 정보를 받아오기 위해 ""populate"" 사용
        // 1) movie == movieId 인넘 find
        // 2) populate(reference되어있는 넘, 그넘중 불러올 넘)
        // ex) .populate('writer', 'name').populate('movie'); : writer의 이름, movie 전체 정보 가져오기
        const reviews = await Review.find({
            movie: movieId,
        })
            // populate(path: ref되어있는 필드명, select: 특정 필드)
            .populate('writer', 'name')
            .populate('movie');
        
        console.log(reviews); 
        // 확인해보면 객체까지 같이 반환하는데, 딱 name과 정보만 보내려한다!

        const data = await Promise.all(
            // map: 배열을 돌면서 작업함
            reviews.map(async (review: any) => {
                const result = {
                    writer: review.writer.name, // writer 이름정보만
                    movie: review.movie, // movie 전체정보
                    title: review.title,
                    content: review.content,
                };

                return result;
            }),
        );

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createReview,
    getReviews,
};
