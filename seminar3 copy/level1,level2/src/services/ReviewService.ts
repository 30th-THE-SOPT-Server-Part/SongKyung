import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import { ReviewCreateDto } from '../interfaces/review/ReviewCreateDto';
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
            movie: movieId,
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
        // 해당 Id의 정보를 받아오기 위해 ""populate"" 사용
        const reviews = await Review.find({
            movie: movieId,
        })
            // populate(path: ref되어있는 필드명, select: 특정 필드)
            .populate('writer', 'name')
            .populate('movie');
        
        console.log(reviews);

        const data = await Promise.all(
            reviews.map(async (review: any) => {
                const result = {
                    writer: review.writer.name,
                    movie: review.movie,
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
