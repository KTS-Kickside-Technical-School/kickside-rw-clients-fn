import { Author } from "./User";

export interface ArticleType {
    _id: string;
    title: string;
    coverImage: string;
    content: string;
    category: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
    status: string;
    isEditable: boolean;
    views: number;
}

export interface MonthlyAnalytics {
    month: string;
    comments: number;
    views: number;
  }