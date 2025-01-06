import { Author } from "./User";

export interface ArticleType {
    _id: string;
    title: string;
    coverImage: string;
    content: string;
    category: string;
    author: Author;
    createdAt: string;
    status: string;
}