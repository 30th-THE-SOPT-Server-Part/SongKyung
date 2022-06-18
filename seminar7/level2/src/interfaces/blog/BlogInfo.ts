import { CateInfo } from "../category/CateInfo";

export interface BlogInfo {
    title: string;
    content: string;
    category: CateInfo;
}