const db = require('../data/dbManager')
const TutorListQueryBuilder = require('./queries/TutorListQueryBuilder')
const TeacherTutorListQueryBuilder = require('./queries/TeacherTutorListQueryBuilder')

class TutorsModel {
  // 检查 tutor_code 是否已存在
  static async checkTutorCodeExists(city, tutorCode) {
    const sql = `
      SELECT COUNT(*) as count 
      FROM tutor_orders 
      WHERE tutor_code = ?
    `
    const result = await db.query(city, sql, [tutorCode])
    return result[0].count > 0
  }

  // 创建家教订单
  static async create(city, data, staffId) {
    // 首先检查 tutor_code 是否已存在
    const exists = await this.checkTutorCodeExists(city, data.tutor_code)
    if (exists) {
      throw new Error('订单编号已存在')
    }

    // 处理科目，如果有不在预定义选项中的科目，替换为"其他"
    const validSubjects = ['语文', '数学', '英语', '物理', '化学', '生物', '历史', '地理', '政治', '国际课程', '其他'];
    const processedSubjects = data.subjects.map(subject => 
      validSubjects.includes(subject) ? subject : '其他'
    );
    // 去重，避免多个"其他"
    const uniqueSubjects = [...new Set(processedSubjects)];

    const sql = `
      INSERT INTO tutor_orders (
        tutor_code, student_gender, teaching_type, student_grade,
        subjects, teacher_type, teacher_gender, order_tags,
        district, city, address, grade_score, student_level,
        tutoring_time, salary, requirement_desc, phone_number, 
        order_source, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    const values = [
      data.tutor_code,
      data.student_gender,
      data.teaching_type,
      data.student_grade,
      uniqueSubjects.join(','),
      data.teacher_type || null,
      data.teacher_gender || null,
      data.order_tags ? data.order_tags.join(',') : null,
      data.district,
      data.city || '天津',
      data.address,
      data.grade_score,
      data.student_level,
      data.tutoring_time,
      data.salary,
      data.requirement_desc,
      data.phone_number || null,
      data.order_source || null,
      staffId
    ]

    const result = await db.query(city, sql, values)
    return result.insertId
  }

  // 更新家教订单
  static async update(city, id, data, staffId) {
    const updates = []
    const values = []

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'subjects' || key === 'order_tags') {
          updates.push(`${key} = ?`)
          values.push(Array.isArray(value) ? value.join(',') : value)
        } else {
          updates.push(`${key} = ?`)
          values.push(value)
        }
      }
    })

    values.push(staffId)
    values.push(id)

    const sql = `
      UPDATE tutor_orders 
      SET ${updates.join(', ')}, updated_by = ?
      WHERE id = ? AND is_deleted = FALSE
    `

    const result = await db.query(city, sql, values)
    return result.affectedRows > 0
  }

  // 删除家教订单
  static async delete(city, id, staffId) {
    const sql = `
      UPDATE tutor_orders 
      SET is_deleted = TRUE, 
          deleted_by = ?, 
          deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND is_deleted = FALSE
    `
    const result = await db.query(city, sql, [staffId, id])
    return result.affectedRows > 0
  }

  // 获取家教订单列表
  static async getList(city, filters = {}, pagination = {}) {
    const query = new TutorListQueryBuilder(city)
    
    return await query
      // 添加所有筛选条件（如学生性别、年级等）
      .addFilters(filters)
      // 添加关键词搜索（如订单编号、描述等）
      .addKeywordSearch(filters.keyword)
      // 添加分页条件（如第几页、每页多少条）
      .addPagination(pagination)
      // 执行查询并返回结果
      .execute()
  }

  // 获取单个家教订单详情
  static async getById(city, idOrCode) {
    const sql = `
        SELECT t.*, 
               c.username as created_by_name,
               u.username as updated_by_name,
               d.username as deleted_by_name,
               dt.name as deal_teacher_name,
               ds.username as deal_staff_name
        FROM tutor_orders t
        LEFT JOIN staff c ON t.created_by = c.id
        LEFT JOIN staff u ON t.updated_by = u.id
        LEFT JOIN staff d ON t.deleted_by = d.id
        LEFT JOIN teachers dt ON t.deal_teacher_id = dt.id
        LEFT JOIN staff ds ON t.deal_staff_id = ds.id
        WHERE (t.id = ? OR t.tutor_code = ?) AND t.is_deleted = FALSE
    `
    const rows = await db.query(city, sql, [idOrCode, idOrCode])
    return rows[0]
  }

  // 更新订单状态为已成交
  static async markAsDeal(city, id, teacherId, staffId) {
    const sql = `
      UPDATE tutor_orders 
      SET status = '已成交',
          deal_time = CURRENT_TIMESTAMP,
          deal_teacher_id = ?,
          deal_staff_id = ?,
          updated_by = ?
      WHERE id = ? AND is_deleted = FALSE
    `
    const result = await db.query(city, sql, [teacherId, staffId, staffId, id])
    return result.affectedRows > 0
  }

  // 获取教师端家教订单表
  static async getTeacherList(city, filters = {}, pagination = {}) {
    const queryBuilder = new TeacherTutorListQueryBuilder(city)
    
    queryBuilder
      .addBasicFilters(filters)
      .addStudentFilters(filters)
      .addTeacherFilters(filters)
      .addSubjectsFilter(filters.subjects)
      .addLocationFilters(filters)
      .addKeywordSearch(filters.keyword)
      .addOrderTagsFilter(filters.order_tags)
      .addPagination(pagination)

    return await queryBuilder.execute()
  }

  // 取消成交
  static async markAsUnDeal(city, id, staffId) {
    const sql = `
      UPDATE tutor_orders 
      SET status = '未成交',
          deal_time = NULL,
          deal_teacher_id = NULL,
          deal_staff_id = NULL,
          updated_by = ?
      WHERE id = ? AND is_deleted = FALSE
    `
    const result = await db.query(city, sql, [staffId, id])
    return result.affectedRows > 0
  }

  // 在 TutorsModel 类中添加新方法
  static async checkTeacherExists(city, teacherId) {
    try {
      if (!teacherId) return true

      const sql = `
        SELECT COUNT(*) as count 
        FROM teachers 
        WHERE id = ?
      `
      const [result] = await db.query(city, sql, [teacherId])
      return result.count > 0

    } catch (error) {
      console.error('检查教师是否存在时发生错误:', error)
      throw new Error('检查教师失败')
    }
  }
}

module.exports = TutorsModel
