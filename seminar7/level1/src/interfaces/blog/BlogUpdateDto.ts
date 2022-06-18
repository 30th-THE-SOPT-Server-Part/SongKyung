import { CateInfo } from "../category/CateInfo";

export interface BlogUpdateDto {
    title?: string;
    content?: string;
    category?: CateInfo;
}