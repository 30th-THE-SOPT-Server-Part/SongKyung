// Success, Fail 반환 메세지를 미리 모듈화

const util = {
    success: (status: number, message: string, data?: any) => {
        return {
            status,
            success: true,
            message,
            data,
        };
    },
    fail: (status: number, message: string, data?: any) => {
        return {
            status,
            success: false,
            message,
        };
    },
};

export default util;
