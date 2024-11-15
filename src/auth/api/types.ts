export type LoginResponse = {
    token: string;
    userId: string;
    username: string;
};

export type RegisterResponse = {
    userId: string;
    token: string;
    username: string;
};


export type GetUserResponse = {
    userId: string;
    username: string;
    email: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};