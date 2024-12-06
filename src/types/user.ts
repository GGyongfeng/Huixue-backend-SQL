// UserInfo 接口定义了用户信息的格式
export interface UserInfo {
    id: number;
    name: string;
    username: string;
    avatar: string;
    token: string;
}

// 登录请求参数
export interface LoginParams {
    username: string;
    password: string;
}

// 注册请求参数
export interface RegisterParams {
    username: string;
    password: string;
    name: string;
    role?: string;
    city?: string;
    sex?: '男' | '女';
}

// API 响应格式
export interface ApiResponse<T = any> {
    code: number;
    data: T | null;    // 这里的 T 就是 UserInfo
    message: string;
} 