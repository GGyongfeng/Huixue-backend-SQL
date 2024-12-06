const resCode = require('@/constants/resCode')

/**
 * 统一错误响应生成器
 * @param {number} code 错误码
 * @param {string} message 错误信息
 * @param {Error} [error] 原始错误对象（可选）
 */
const errorResponse = (code, message, error = null) => {
  // 创建一个自定义错误对象
  const customError = new Error(message)
  customError.code = code
  console.log('errorHandler - 错误码:', customError.code)
  console.log('errorHandler - 错误信息:', customError.message)

  // 如果传入了原始错误，保存它
  if (error) {
    customError.originalError = error
    console.error('原始错误:', error)
  }
  
  return customError
}

module.exports = {
  errorResponse
} 