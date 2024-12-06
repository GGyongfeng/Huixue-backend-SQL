/**
 * @typedef {Object} FilterOption
 * @property {string} field - 字段名
 * @property {string} label - 显示标签
 * @property {string[]} options - 可选值列表
 */

/** @type {FilterOption[]} */
const TUTOR_FILTERS = [
  {
    field: 'student_gender',
    label: '学生性别',
    options: ['男', '女']
  },
  {
    field: 'teaching_type',
    label: '教学类型',
    options: ['一对一', '一对多']
  },
  {
    field: 'student_grade',
    label: '学生年级',
    options: ['幼儿', '小学', '初一', '初二', '初三', '高一', '高二', '高三', '其他']
  },
  {
    field: 'subjects',
    label: '补习科目',
    options: ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治']
  },
  {
    field: 'teacher_type',
    label: '教师类型',
    options: ['在职老师', '985学生', '无']
  },
  {
    field: 'teacher_gender',
    label: '教师性别',
    options: ['男', '女', '无']
  },
  {
    field: 'district',
    label: '区域',
    options: ['南开区', '和平区', '河西区', '河东区', '河北区', '红桥区', '津南区', '滨海新区']
  },
  {
    field: 'student_level',
    label: '学生水平',
    options: ['优秀', '较好', '中等', '不及格']
  },
  {
    field: 'is_visible',
    label: '可见状态',
    options: ['是', '否'],
    type: 'boolean'
  },
  {
    field: 'status',
    label: '订单状态',
    options: ['已成交', '未成交']
  }
]

// 获取所有可筛选字段名
const FILTER_FIELDS = TUTOR_FILTERS.map(filter => filter.field)

/**
 * 获取指定筛选条件的选项
 * @param {string} fieldName 字段名
 * @returns {string[]} 选项数组
 */
const getFilterOptions = (fieldName) => {
  const filter = TUTOR_FILTERS.find(f => f.field === fieldName)
  return filter?.options || []
}

/**
 * 验证筛选值是否合法
 * @param {string} field 字段名
 * @param {string|string[]} value 筛选值
 * @returns {boolean} 是否合法
 */
const validateFilterValue = (field, value) => {
  const filter = TUTOR_FILTERS.find(f => f.field === field)
  if (!filter) return false
  
  const values = Array.isArray(value) ? value : [value]
  return values.every(v => filter.options.includes(v))
}

/**
 * 转换布尔值
 * @param {string} value 原始值
 * @returns {number} 转换后的值
 */
const convertBooleanValue = (value) => {
  return value === '是' ? 1 : 0
}

module.exports = {
  TUTOR_FILTERS,
  FILTER_FIELDS,
  getFilterOptions,
  validateFilterValue,
  convertBooleanValue
} 