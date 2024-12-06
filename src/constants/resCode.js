/**
 * API 响应状态码常量
 */
module.exports = {
  // 成功
  SUCCESS: 200,
  
  // 客户端错误 4xx
  BAD_REQUEST: 400,    // 错误的请求
  UNAUTHORIZED: 401,   // 未授权
  FORBIDDEN: 403,      // 禁止访问
  NOT_FOUND: 404,      // 资源未找到
  
  // 服务器错误 5xx
  INTERNAL_ERROR: 500, // 服务器内部错误
  SERVICE_BUSY: 503,   // 服务不可用
  
  // 业务相关状态码
  INVALID_PARAMS: 1001,    // 参数无效
  DATA_NOT_FOUND: 1002,    // 数据不存在
  OPERATION_FAILED: 1003,  // 操作失败
} 