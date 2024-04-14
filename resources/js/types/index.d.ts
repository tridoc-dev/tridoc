export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Project {
    id: number;
    name: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    user_id: number;
    user: User;
}
