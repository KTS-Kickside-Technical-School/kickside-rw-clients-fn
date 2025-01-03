export interface ArticleType {
    _id: string;
    title: string;
    coverImage: string;
    content: string;
    category: string;
    author: {
        firstName: string;
        lastName: string;
    };
    createdAt: string;
    status: string;
}