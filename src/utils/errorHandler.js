/**
 * 统一的错误响应格式
 */
function errorResponse(code, message, error = null) {
    const err = new Error(message);
    err.code = code;
    err.originalError = error;
    return err;
}

/**
 * 错误处理中间件
 */
function errorHandler(err, req, res, next) {
    console.error('服务器错误:', err);
    
    // 始终使用 200 作为 HTTP 状态码，在响应体中包含业务错误码
    res.json({
        code: err.code || 500,
        message: err.message || '服务器内部错误',
        error: err.originalError?.message
    });
}

module.exports = {
    errorResponse,
    errorHandler
}; 