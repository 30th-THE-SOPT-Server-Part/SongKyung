import { CateInfo } from "../category/CateInfo";

export interface BlogCreateDto {
    title: string;
    content: string;
    category: CateInfo;
}