const BaseQueryBuilder = require('./BaseQueryBuilder');
const db = require('../../data/dbManager')

class TeacherTutorListQueryBuilder extends BaseQueryBuilder {
  constructor(city) {
    super(city);
    this.sql = `
      SELECT 
        t.id,
        t.tutor_code,
        t.student_gender,
        t.teaching_type,
        t.student_grade,
        t.subjects,
        t.teacher_type,
        t.teacher_gender,
        t.subjects_desc,
        t.order_tags,
        t.district,
        t.city,
        t.address,
        t.grade_score,
        t.student_level,
        t.tutoring_time,
        t.salary,
        t.requirement_desc,
        t.original_text,
        c.realname as created_by_name,
        u.realname as updated_by_name
      FROM tutor_orders t
      LEFT JOIN staff c ON t.created_by = c.id
      LEFT JOIN staff u ON t.updated_by = u.id
      WHERE 1=1
    `
    this.values = []
  }

  // 添加通用的数组参数处理方法
  addArrayFilter(field, value, column) {
    if (!value) return this
    
    if (Array.isArray(value)) {
      const placeholders = value.map(() => '?').join(',')
      this.sql += ` AND ${column} IN (${placeholders})`
      this.values.push(...value)
    } else {
      this.sql += ` AND ${column} = ?`
      this.values.push(value)
    }
    return this
  }

  // 添加基础筛选条件（包含默认值）
  addBasicFilters(filters) {
    // 默认条件：未删除、可见、未成交
    this.sql += ` AND t.is_deleted = FALSE`
    this.sql += ` AND t.is_visible = TRUE`
    this.sql += ` AND t.status = '未成交'`

    return this
  }

  // 其他选方法与 TutorListQueryBuilder 类似
  addStudentFilters(filters) {
    this.addArrayFilter('student_grade', filters.student_grade, 't.student_grade')
    this.addArrayFilter('student_gender', filters.student_gender, 't.student_gender')
    return this
  }

  addTeacherFilters(filters) {
    this.addArrayFilter('teacher_gender', filters.teacher_gender, 't.teacher_gender')
    this.addArrayFilter('teacher_type', filters.teacher_type, 't.teacher_type')
    return this
  }

  addSubjectsFilter(subjects) {
    if (subjects) {
      if (Array.isArray(subjects)) {
        this.sql += ` AND (FIND_IN_SET(?, t.subjects)`
        this.values.push(subjects[0])
        for (let i = 1; i < subjects.length; i++) {
          this.sql += ` OR FIND_IN_SET(?, t.subjects)`
          this.values.push(subjects[i])
        }
        this.sql += `)`
      } else {
        this.sql += ` AND FIND_IN_SET(?, t.subjects)`
        this.values.push(subjects)
      }
    }
    return this
  }

  addLocationFilters(filters) {
    this.addArrayFilter('district', filters.district, 't.district')
    this.addArrayFilter('city', filters.city, 't.city')
    return this
  }

  addKeywordSearch(keyword) {
    if (keyword) {
      this.sql += ` AND (
        t.requirement_desc LIKE ? 
        OR t.tutor_code LIKE ?
        OR t.address LIKE ?
      )`
      this.values.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`)
    }
    return this
  }

  addPagination(pagination) {
    // 使用 id 降序排序，而不是 created_at
    this.sql += ` ORDER BY t.id DESC`
    
    const page = Math.max(1, parseInt(pagination.page) || 1)
    const pageSize = Math.max(1, parseInt(pagination.pageSize) || 20)
    
    const offset = (page - 1) * pageSize
    this.sql += ` LIMIT ${offset}, ${pageSize}`
    
    return this
  }

  // 添加订单标签筛选方法
  addOrderTagsFilter(tags) {
    // console.log('TeacherTutorListQueryBuilder - 接收到的 tags:', tags);
    if (tags) {
      if (Array.isArray(tags)) {
        this.sql += ` AND (`
        const conditions = tags.map((_, index) => {
          if (index > 0) this.sql += ` OR `
          this.sql += `FIND_IN_SET(?, t.order_tags)`
          this.values.push(tags[index])
          return true
        })
        this.sql += `)`
      } else {
        this.sql += ` AND FIND_IN_SET(?, t.order_tags)`
        this.values.push(tags)
      }
    }
    return this
  }

  async execute() {
    const countSql = `
      SELECT COUNT(*) as total 
      FROM tutor_orders t 
      WHERE 1=1 
      ${this.sql.split('WHERE 1=1')[1].split('ORDER BY')[0]}
    `
    
    try {
      const [rows, totalResult] = await Promise.all([
        super.execute(),
        db.query(this.city, countSql, this.values)
      ])

      return {
        list: rows,
        total: totalResult[0].total
      }
    } catch (error) {
      console.error('SQL:', this.sql)
      console.error('Values:', this.values)
      throw error
    }
  }
}

module.exports = TeacherTutorListQueryBuilder 