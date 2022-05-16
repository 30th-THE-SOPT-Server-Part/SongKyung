import { UserCreateDto } from '../interfaces/user/UserCreateDto';
import { UserResponseDto } from '../interfaces/user/UserResponseDto';
import { UserUpdateDto } from '../interfaces/user/UserUpdateDto';
import { PostBaseResponseDto } from '../interfaces/common/PostBaseResponseDto';
import User from '../models/User';

const createUser = async (
    userCreateDto: UserCreateDto,
): Promise<PostBaseResponseDto> => {
    //Dto로 객체를 전달한다.
    try {
        const user = new User({
            name: userCreateDto.name,
            phone: userCreateDto.phone,
            email: userCreateDto.email,
            age: userCreateDto.age,
            school: {
                name: userCreateDto.school?.name,
                major: userCreateDto.school?.major,
            },
        }); // document 를 만들 준비 끝

        await user.save();
        // 편리한 mongoose~
        // .save로 새로운 document 생성 후 mongoDB에 저장

        const data = {
            _id: user.id,
        };
        // 반환 값 가공

        return data;
        // 위에 저장된 데이터의 id를 반환
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
    try {
        //findByIdAndUpdate 함수 사용할 것
        // createUser에서 한거 처럼 일일이 넣어줘도 되긴 함
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const findUserById = async (
    userId: string,
): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const deleteUser = async (userId: string): Promise<void> => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createUser,
    updateUser,
    findUserById,
    deleteUser,
};
