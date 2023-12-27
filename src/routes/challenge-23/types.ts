
export interface Comment {
    id: string;
    author: string;
    timestamp: string;
    content: string;
    likes: number;
}

export interface ElfPost {
    id: string;
    author: string;
    timestamp: string;
    content: string;
    likes: number;
    comments: Comment[];
}

export type ResponseData = ElfPost[];
