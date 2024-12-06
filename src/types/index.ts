// 导出所有类型
export * from './user';
export * from './menu';

// 通用分页参数
export interface PaginationParams {
    page: number;
    pageSize: number;
}

// 通用分页响应
export interface PaginatedResponse<T> {
    total: number;
    list: T[];
} 