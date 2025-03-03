const BaseQueryBuilder = require('./BaseQueryBuilder');
const db = require('../../data/dbManager');
const { FILTER_FIELDS, TUTOR_FILTERS, convertBooleanValue } = require('../../types/filters')

/**
 * 家教订单列表查询构建器
 * 用于构建复杂的订单列表查询SQL
 */
class TutorListQueryBuilder extends BaseQueryBuilder {
  /**
   * 初始化查询构建器
   * 设置基础的SELECT语句，包含所有需要的表连接
   */
  constructor(city) {
    super(city);
    this.sql = `
      SELECT t.*, 
             c.realname as created_by_name,
             u.realname as updated_by_name,
             d.realname as deleted_by_name,
             ds.realname as deal_staff_name
      FROM tutor_orders t
      LEFT JOIN staff c ON t.created_by = c.id
      LEFT JOIN staff u ON t.updated_by = u.id
      LEFT JOIN staff d ON t.deleted_by = d.id
      LEFT JOIN staff ds ON t.deal_staff_id = ds.id
      WHERE 1=1
    `
    this.values = []  // 用于存储参数化查询的值
  }

  /**
   * 添加通用筛选条件
   * @param {Object} filters - 筛选条件对象
   * @returns {TutorListQueryBuilder}
   */
  addFilters(filters) {
    // 首先添加 is_deleted 条件
    if (filters.is_deleted !== undefined) {
      this.sql += ` AND t.is_deleted = ?`
      this.values.push(filters.is_deleted)
    }

    // 遍历所有定义的筛选字段配置
    TUTOR_FILTERS.forEach(filter => {
      const { field, type } = filter

      // 检查该字段是否有值且不为空数组，且不是 is_visible
      if (filters[field] && filters[field].length > 0 && field !== 'is_visible') {
        
        // 处理特殊字段：subjects 和 order_tags
        // 这些字段在数据库中以逗号分隔的字符串存储，如："数学,英语"
        if (field === 'subjects' || field === 'order_tags') {
          // 开始 OR 条件组
          this.sql += ` AND (`
          // 对数组中的每个值生成 FIND_IN_SET 查询
          // 例如：FIND_IN_SET('数学', t.subjects) OR FIND_IN_SET('英语', t.subjects)
          this.sql += filters[field].map(() => `FIND_IN_SET(?, t.${field})`).join(' OR ')
          this.sql += `)`
          // 添加参数值到查询参数数组
          this.values.push(...filters[field])
        } else if (type === 'boolean') {
          // 处理布尔类型字段
          const boolValues = filters[field].map(convertBooleanValue)
          this.sql += ` AND t.${field} IN (${boolValues.map(() => '?').join(',')})`
          this.values.push(...boolValues)
        } else {
          // 处理普通字段：使用 IN 查询
          console.log('=== 处理普通字段查询 ===')
          console.log('字段名:', field)
          console.log('查询值:', filters[field])
          
          // 构建 IN 查询
          const inClause = ` AND t.${field} IN (${filters[field].map(() => '?').join(',')})`
          this.sql += inClause
          
          // 添加参数值到查询参数数组
          this.values.push(...filters[field])
          
          console.log('生成的 SQL 片段:', inClause)
          console.log('当前完整 SQL:', this.sql)
          console.log('当前参数值:', this.values)
          console.log('=== 普通字段处理完成 ===\n')
        }
      }
    })

    if (filters.is_visible) {
      const visibilityMap = {
        '隐藏': 0,
        '可见': 1
      }
      const values = filters.is_visible.map(v => visibilityMap[v])
      this.sql += ` AND t.is_visible IN (${values.map(() => '?').join(',')})`
      this.values.push(...values)
    }

    // 添加时间范围筛选
    if (filters.created_at && filters.created_at.length === 2) {
      const [startTime, endTime] = filters.created_at
      this.sql += ` AND t.created_at BETWEEN ? AND ?`
      this.values.push(startTime, endTime)
    }

    // 添加 created_by_name 的筛选
    if (filters.created_by_name) {
      this.sql += ` AND c.realname IN (${filters.created_by_name.map(() => '?').join(',')})`
      this.values.push(...filters.created_by_name)
    }

    // 返回 this 以支持链式调用
    return this
  }

  /**
   * 添加地区相关的筛选条件
   * @param {Object} filters - 筛选条件对象
   * @param {string[]} filters.district - 区域
   * @param {string[]} filters.city - 城市
   * @returns {TutorListQueryBuilder}
   */
  addLocationFilters(filters) {
    if (filters.district && filters.district.length > 0) {
      this.sql += ` AND t.district IN (${filters.district.map(() => '?').join(',')})`
      this.values.push(...filters.district)
    }

    if (filters.city && filters.city.length > 0) {
      this.sql += ` AND t.city IN (${filters.city.map(() => '?').join(',')})`
      this.values.push(...filters.city)
    }
    return this
  }

  /**
   * 添加关键词搜索条件
   * 会在订单编号和需求描述中搜索
   * @param {string} keyword - 搜索关键词
   * @returns {TutorListQueryBuilder}
   */
  addKeywordSearch(keyword) {
    // console.log('=== 处理关键词搜索 ===')
    // console.log('接收到的 keyword:', keyword)
    
    if (keyword) {
      const searchClause = ` AND (
        t.tutor_code LIKE ? 
        OR t.requirement_desc LIKE ? 
        OR t.address LIKE ?
      )`
      this.sql += searchClause
      const searchValues = [
        `%${keyword}%`, 
        `%${keyword}%`,
        `%${keyword}%`
      ]
      this.values.push(...searchValues)
      
      console.log('添加的 SQL 片段:', searchClause)
      console.log('添加的搜索值:', searchValues)
      console.log('当前完整 SQL:', this.sql)
      console.log('当前所有参数:', this.values)
    } else {
      // console.log('没有关键词，跳过关键词搜索')
    }
    
    return this
  }

  /**
   * 添加分页条件
   * @param {Object} pagination - 分页参数对象
   * @param {number} pagination.page - 页码
   * @param {number} pagination.pageSize - 每页条数
   * @returns {TutorListQueryBuilder}
   */
  addPagination(pagination) {
    this.sql += ` ORDER BY t.id DESC`
    
    const page = Math.max(1, parseInt(pagination.page) || 1)
    const pageSize = Math.max(1, parseInt(pagination.pageSize) || 20)
    
    const offset = (page - 1) * pageSize
    this.sql += ` LIMIT ${offset}, ${pageSize}`
    
    return this
  }

  /**
   * 添加教学类型筛选条件
   * @param {Object} filters - 筛选条件对象
   * @returns {TutorListQueryBuilder}
   */
  addTeachingTypeFilter(filters) {
    if (filters.teaching_type && filters.teaching_type.length > 0) {
      this.sql += ` AND t.teaching_type IN (${filters.teaching_type.map(() => '?').join(',')})`
      this.values.push(...filters.teaching_type)
    }
    return this
  }

  /**
   * 添加学生水平筛选条件
   * @param {Object} filters - 筛选条件对象
   * @returns {TutorListQueryBuilder}
   */
  addStudentLevelFilter(filters) {
    if (filters.student_level && filters.student_level.length > 0) {
      this.sql += ` AND t.student_level IN (${filters.student_level.map(() => '?').join(',')})`
      this.values.push(...filters.student_level)
    }
    return this
  }

  /**
   * 添加可见状态筛选条件
   * @param {Object} filters - 筛选条件对象
   * @returns {TutorListQueryBuilder}
   */
  addVisibilityFilter(filters) {
    if (filters.is_visible && filters.is_visible.length > 0) {
      this.sql += ` AND t.is_visible IN (${filters.is_visible.map(() => '?').join(',')})`
      this.values.push(...filters.is_visible)
    }
    return this
  }

  /**
   * 执行构建好的查询
   * @returns {Promise<Object>} 返回查询结果，包含列表数据和总数
   */
  async execute() {
    const countSql = `
      SELECT COUNT(*) as total 
      FROM tutor_orders t 
      LEFT JOIN staff c ON t.created_by = c.id
      LEFT JOIN staff u ON t.updated_by = u.id
      LEFT JOIN staff d ON t.deleted_by = d.id
      LEFT JOIN staff ds ON t.deal_staff_id = ds.id
      WHERE 1=1 
      ${this.sql.split('WHERE 1=1')[1].split('ORDER BY')[0]}
    `;
    
    try {
      const [rows, totalResult] = await Promise.all([
        super.execute(),
        db.query(this.city, countSql, this.values)
      ]);

      return {
        list: rows,
        total: totalResult[0].total
      };
    } catch (error) {
      console.error('SQL:', this.sql);
      console.error('Values:', this.values);
      throw error;
    }
  }
}

module.exports = TutorListQueryBuilder 