// 과제 조건
// 1. Member, Dinner interface 만들고 타입 지정하기
// 2. organize 내부 로직 채우기
import { Member } from "./interface/Member";
import { Dinner } from "./interface/Dinner";

const dinner: Dinner = {
    member: [
        {
            name: '채정아',
            group: 'ob'
        },
        {
            name: '김동재',
            group: 'yb'
        },
        {
            name: '강민재',
            group: 'yb'
        },
        {
            name: '김루희',
            group: 'ob'
        },
        {
            name: '박진수',
            group: 'ob'
        }
    ],
    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
        return array;
    },
    organize(array) {
        const dinnerMember = this.shuffle(array);
        console.log(`오늘의 저녁 식사 멤버는 ${dinnerMember[0].name}, ${dinnerMember[1].name}`);
    }
};

dinner.organize(dinner.member);