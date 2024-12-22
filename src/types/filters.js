/**
 * @typedef {Object} FilterOption
 * @property {string} field - 字段名
 * @property {string} label - 显示标签
 * @property {string[]} options - 可选值列表
 */

// 定义不同城市的区域选项
const CITY_DISTRICTS = {
  '天津': ['南开区', '和平区', '河西区', '河东区', '河北区', '红桥区', '津南区', '滨海新区', '线上', '其他'],
  '北京': ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '通州区', '线上', '其他'],
  // 可以继续添加其他城市的区域
}

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
    field: 'order_tags',
    label: '订单标签',
    options: [
      '专职单子', 
      '好单子', 
      '加急单子', 
      '特殊单子',
      '长期', 
      '短期',
      '寒假',
      '暑假'
    ]
  },
  {
    field: 'student_grade',
    label: '学生年级',
    options: ['幼儿', '小学', '初一', '初二', '初三', '高一', '高二', '高三', '成人', '其他']
  },
  {
    field: 'subjects',
    label: '补习科目',
    options: [
      '语文', 
      '数学', 
      '英语', 
      '物理', 
      '化学', 
      '生物', 
      '历史', 
      '地理', 
      '政治',
      '国际课程',
      '其他'
    ]
  },
  {
    field: 'teacher_type',
    label: '教师类型',
    options: ['在职老师', '985学生']
  },
  {
    field: 'teacher_gender',
    label: '教师性别',
    options: ['男', '女']
  },
  {
    field: 'district',
    label: '区域',
    options: [], // 初始为空，将通过函数动态获取
    getCityOptions: (city) => CITY_DISTRICTS[city] || ['其他'] // 添加获取城市区域的方法
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
const getFilterOptions = (fieldName, city) => {
  const filter = TUTOR_FILTERS.find(f => f.field === fieldName)
  if (!filter) return []
  
  // 如果是区域字段且提供了城市参数，返回该城市的区域选项
  if (fieldName === 'district' && city) {
    return filter.getCityOptions(city)
  }
  
  return filter.options || []
}

/**
 * 验证筛选值是否合法
 * @param {string} field 字段名
 * @param {string|string[]} value 筛选值
 * @returns {boolean} 是否合法
 */
const validateFilterValue = (field, value, city) => {
  const filter = TUTOR_FILTERS.find(f => f.field === field)
  if (!filter) return false
  
  const values = Array.isArray(value) ? value : [value]
  
  // 如果是区域字段，使用对应城市的选项进行验证
  if (field === 'district') {
    const validOptions = getFilterOptions(field, city)
    return values.every(v => validOptions.includes(v))
  }
  
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
  convertBooleanValue,
  CITY_DISTRICTS  // 导出城市区域配置
} 