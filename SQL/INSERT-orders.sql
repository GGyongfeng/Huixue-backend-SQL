-- 删除 tutor_orders 表
DROP TABLE IF EXISTS tutor_orders;   


--  插入 tutor_orders 数据
INSERT INTO tutor_orders (
    tutor_code, student_gender, teaching_type, student_grade, subjects,
    teacher_type, teacher_gender, order_tags, district, city, address,
    grade_score, student_level, tutoring_time, salary, requirement_desc,
    created_by
) VALUES
(
    'TJ2024001', '男', '一对一', '高二', '物理,数学',
    '985学生', '无', '好单子,加急单子', '南开区', '天津', '南开区水上公园东路38号',
    '89', '中等', '每周二、四晚上7:00-9:00', '150元/小时', 
    '高二理科生，数学物理成绩中等，希望能提高解题思路和方法，为高考做准备。',
    1
),
(
    'TJ2024002', '女', '一对一', '初三', '英语',
    '在职老师', '女', '专职单子', '和平区', '天津', '和平区南京路22号',
    '65', '不及格', '周六、日上午9:00-11:00', '200元/小时',
    '初三女生，英语基础较差，听力和口语都需要提升，希望能在中考前有明显进步。',
    1
),
(
    'TJ2024003', '男', '一对多', '高一', '数学,物理',
    '985学生', '无', '好单子', '河西区', '天津', '河西区黑牛城道120号',
    '92', '优秀', '每周三、五下午4:00-6:00', '100元/小时/人',
    '高一理科生，成绩优秀，希望能保持并更上一层楼，可以和同学一起上课。',
    2
),
(
    'TJ2024004', '女', '一对一', '小学', '语文,英语',
    '在职老师', '女', '专职单子,好单子', '南开区', '天津', '南开区白堤路25号',
    '78', '中等', '周一、三、五下午2:00-4:00', '120元/小时',
    '小学五年级女生，语文作文和英语口语需要提升，希望能有耐心的老师长期辅导。',
    3
),
(
    'TJ2024005', '男', '一对一', '初二', '化学,物理',
    '985学生', '男', '加急单子', '河北区', '天津', '河北区狮子林大街18号',
    '71', '不及格', '工作日晚上6:30-8:30', '180元/小时',
    '初二男生，理科成绩较差，期中考试不理想，希望能在期末前突击提高。',
    2
);


-- 然后插入测试数据
INSERT INTO tutor_orders (
    tutor_code, student_gender, teaching_type, student_grade, subjects,
    teacher_type, teacher_gender, order_tags, district, city, address,
    grade_score, student_level, tutoring_time, salary, requirement_desc,
    created_by
) VALUES
-- 高中订单
(
    'TJ2024101', '男', '一对一', '高二', '物理,数学',
    '985学生', '无', '好单子,加急单子', '南开区', '天津', '南开区水上公园东路38号',
    '89', '中等', '每周二、四晚上7:00-9:00', '150元/小时', 
    '高二理科生，数学物理成绩中等，希望能提高解题思路和方法，为高考做准备。',
    1
),
(
    'TJ2024102', '女', '一对一', '高三', '化学,生物',
    '在职老师', '女', '好单子', '和平区', '天津', '和平区南京路22号',
    '92', '较好', '周末上午9:00-11:00', '200元/小时',
    '理科重点班学生，化学生物基础好，希望能冲刺更高分数。老师要求有高考教学经验。',
    1
),
(
    'TJ2024103', '男', '一对一', '高一', '数学,英语',
    '985学生', '无', '加急单子', '河西区', '天津', '河西区黑牛城道120号',
    '75', '不及格', '每周一、三、五晚上6:00-8:00', '130元/小时',
    '高一新生，英语和数学都比较薄弱，需要帮助打好基础，提高学习兴趣。',
    2
),
-- 初中订单
(
    'TJ2024104', '女', '一对多', '初三', '语文,英语,数学',
    '在职老师', '女', '专职单子', '南开区', '天津', '南开区白堤路45号',
    '85', '中等', '周末全天', '180元/小时',
    '初三备考阶段，三科都需要提高，最好是有中考经验的老师。可以和其他同学一起上课。',
    2
),
(
    'TJ2024105', '男', '一对一', '初二', '物理,数学',
    '985学生', '男', null, '河北区', '天津', '河北区狮子林大街78号',
    '78', '中等', '每周二、四、六下午4:00-6:00', '120元/小时',
    '初二学生，物理刚开始学习，需要打好基础。数学成绩一般，希望能提高。',
    1
),
-- 小学订单
(
    'TJ2024106', '女', '一对一', '小学', '语文,英语',
    '在职老师', '女', '好单子', '和平区', '天津', '和平区西安道89号',
    null, '较好', '周一到周五下午3:00-5:00', '100元/小时',
    '小学四年级学生，希望提高语文写作和英语口语能力。要求老师有小学教学经验。',
    3
),
(
    'TJ2024107', '男', '一对一', '小学', '数学',
    '985学生', '无', '特殊单子', '滨海新区', '天津', '滨海新区第五大街2号',
    null, '优秀', '周末下午2:00-4:00', '150元/小时',
    '小学六年级学生，数学成绩优秀，希望能学习奥数，为将来参加竞赛做准备。',
    2
),
-- 国际课程订单
(
    'TJ2024108', '女', '一对一', '高二', '国际课程',
    '在职老师', '无', '好单子,特殊单子', '和平区', '天津', '和平区重庆道56号',
    'A', '优秀', '工作日晚上7:00-9:00', '300元/小时',
    'IB课程学生，需要数学和物理科目的辅导，要求老师有IB教学经验。',
    1
),
-- 艺术类订单
(
    'TJ2024109', '女', '一对一', '小学', '乐器',
    '在职老师', '女', null, '河西区', '天津', '河西区友谊路234号',
    null, '中等', '周末上午10:00-12:00', '200元/小时',
    '小学三年级学生，想学习钢琴，完全零基础。要求老师有教授儿童钢琴的经验。',
    3
),
-- 多科目订单
(
    'TJ2024110', '男', '一对一', '高三', '语文,数学,英语,物理,化学',
    '在职老师', '无', '好单子,加急单子', '南开区', '天津', '南开区鞍山西道300号',
    '88', '中等', '周末全天', '200元/小时',
    '高三学生，理科综合成绩中等，希望能在各科都有提升。要求老师经验丰富。',
    1
),
-- 特殊时间订单
(
    'TJ2024111', '女', '一对一', '初一', '英语',
    '985学生', '女', null, '津南区', '天津', '津南区咸水沽镇体育场路2号',
    '82', '中等', '寒假集中辅导', '130元/小时',
    '初一学生，希望利用寒假时间提高英语成绩，重点是语法和口语。',
    2
),
-- 特殊要求订单
(
    'TJ2024112', '男', '一对一', '高一', '数学,物理',
    '在职老师', '男', '特殊单子', '红桥区', '天津', '红桥区芥园道78号',
    '65', '不及格', '每天晚上6:00-8:00', '180元/小时',
    '学生有轻度注意力不集中，需要老师有相关教学经验，善于和学生沟通。',
    1
),
-- 竞赛培训订单
(
    'TJ2024113', '女', '一对一', '初三', '数学,物理',
    '985学生', '无', '好单子', '和平区', '天津', '和平区南营门街45号',
    '95', '优秀', '周末下午2:00-5:00', '200元/小时',
    '数理竞赛培训，学生基础好，希望能在竞赛中取得好成绩。',
    2
),
-- 多人家教订单
(
    'TJ2024114', '男', '一对多', '高二', '数学,英语',
    '在职老师', '无', '专职单子', '南开区', '天津', '南开区华苑路18号',
    '80', '中等', '周末上午9:00-12:00', '100元/小时/人',
    '三个高二学生一起上课，水平相近，希望能互相促进提高。',
    3
),
-- 低年级订单
(
    'TJ2024115', '女', '一对一', '幼儿', '英语',
    '在职老师', '女', '特殊单子', '和平区', '天津', '和平区南京路156号',
    null, null, '周三、五下午3:00-4:00', '150元/小时',
    '幼儿园大班学生，希望通过游戏和互动的方式学习英语，培养兴趣。',
    1
);
-- 继续插入更多测试数据
INSERT INTO tutor_orders (
    tutor_code, student_gender, teaching_type, student_grade, subjects,
    teacher_type, teacher_gender, order_tags, district, city, address,
    grade_score, student_level, tutoring_time, salary, requirement_desc,
    created_by
) VALUES
-- 高中理科订单
(
    'TJ2024116', '男', '一对一', '高三', '数学,物理,化学',
    '在职老师', '无', '好单子', '南开区', '天津', '南开区卫津路26号',
    '78', '中等', '每周六、日全天', '200元/小时',
    '理科生，希望能在高考前提高理科成绩，特别是物理和化学科目。老师要求有丰富高考经验。',
    1
),
-- 初中英语强化
(
    'TJ2024117', '女', '一对一', '初二', '英语',
    '985学生', '女', '加急单子', '河西区', '天津', '河西区友谊路89号',
    '85', '较好', '周一、三、五晚上7:00-9:00', '150元/小时',
    '英语基础不错，希望能进一步提高口语和写作能力。希望老师是英语专业或有海外背景。',
    2
),
-- 小学全科辅导
(
    'TJ2024118', '男', '一对一', '小学', '语文,数学,英语',
    '在职老师', '女', '专职单子', '和平区', '天津', '和平区南京路128号',
    null, '中等', '工作日下午4:00-6:00', '120元/小时',
    '小学五年级学生，希望能有老师辅导全科作业，提高学习效率。要求老师有小学教学经验。',
    3
),
-- 高中文科冲刺
(
    'TJ2024119', '女', '一对一', '高三', '语文,历史,政治',
    '在职老师', '无', '好单子', '河东区', '天津', '河东区十一经路56号',
    '88', '较好', '每周六、日上午8:00-12:00', '180元/小时',
    '文科生，目标是重点大学，需要提高文科各科目成绩。希望老师能提供高效的复习方法。',
    1
),
-- 奥数培训
(
    'TJ2024120', '男', '一对一', '小学', '数学',
    '985学生', '无', '特殊单子', '南开区', '天津', '南开区水上公园北路12号',
    null, '优秀', '周末下午2:00-4:00', '200元/小时',
    '小学六年级学生，数学成绩优异，希望参加奥数比赛，需要系统的奥数训练。',
    2
),
-- 高中地理生物
(
    'TJ2024121', '女', '一对一', '高二', '地理,生物',
    '在职老师', '无', null, '河西区', '天津', '河西区解放南路234号',
    '82', '中等', '周末上午9:00-11:00', '160元/小时',
    '理科生，地理和生物成绩一般，希望能提高这两科的考试技巧和应��能力。',
    3
),
-- 初中物理启蒙
(
    'TJ2024122', '男', '一对一', '初二', '物理',
    '985学生', '无', '加急单子', '南开区', '天津', '南开区红旗南路78号',
    '70', '不及格', '每周二、四晚上6:30-8:30', '140元/小时',
    '刚开始学习物理，感觉比较吃力，需要老师从基础开始讲解，培养物理思维。',
    1
),
-- 高中英语口语
(
    'TJ2024123', '女', '一对一', '高一', '英语',
    '在职老师', '女', '特殊单子', '和平区', '天津', '和平区南市街45号',
    '90', '优秀', '周末下午3:00-5:00', '180元/小时',
    '英语笔试成绩不错，但口语较弱，希望能提高口语和听力能力。最好是外教或有留学背景的老师。',
    2
),
-- 初中语文写作
(
    'TJ2024124', '男', '一对一', '初三', '语文',
    '在职老师', '无', null, '河北区', '天津', '河北区金钟河大街167号',
    '75', '中等', '周三、五晚上7:00-9:00', '130元/小时',
    '语文作文和阅读理解较弱，希望能提高写作水平和阅读理解能力。',
    3
),
-- 小学英语兴趣班
(
    'TJ2024125', '女', '一对多', '小学', '英语',
    '985学生', '女', '专职单子', '和平区', '天津', '和平区南营门街67号',
    null, '较好', '周末上午10:00-12:00', '100元/小时/人',
    '小学三年级，3-4人小班，通过游戏和互动方式学习英语，培养英语兴趣。',
    1
),
-- 高中数学提高
(
    'TJ2024126', '男', '一对一', '高二', '数学',
    '在职老师', '无', '好单子', '南开区', '天津', '南开区华苑路90号',
    '85', '较好', '每周一、三、五晚上7:30-9:30', '170元/小时',
    '数学基础尚可，希望能提高解题速度和正确率，为高考做准备。',
    2
),
-- 初中全科补习
(
    'TJ2024127', '女', '一对一', '初一', '语文,数学,英语,物理',
    '在职老师', '女', '专职单子', '河西区', '天津', '河西区梅江道123号',
    '72', '中等', '周末全天', '150元/小时',
    '初一新生，各科成绩都需要提高，希望能有老师全面辅导，打好基础。',
    3
),
-- 高中化学实验
(
    'TJ2024128', '男', '一对一', '高二', '化学',
    '985学生', '无', '特殊单子', '南开区', '天津', '南开区王顶堤大街45号',
    '80', '中等', '周末下午2:00-4:00', '160元/小时',
    '化学实验操作和计算较弱，希望能加强这方面的训练，提高实验能力。',
    1
),
-- 小学陪伴式辅导
(
    'TJ2024129', '女', '一对一', '小学', '语文,数学',
    '在职老师', '女', null, '河东区', '天津', '河东区大王庄路78号',
    null, '中等', '工作日下午3:00-5:00', '110元/小时',
    '小学二年级学生，需要老师辅导完成作业，培养良好的学习习惯。',
    2
),
-- 高中政治备考
(
    'TJ2024130', '男', '一对一', '高三', '政治',
    '在职老师', '无', '加急单子', '和平区', '天津', '和平区南京路345号',
    '82', '中等', '周末上午9:00-11:00', '170元/小时',
    '高考备考，政治科目需要提高，希望能掌握答题技巧和热点分析方法。',
    3
),
-- 初中英语语法
(
    'TJ2024131', '女', '一对一', '初三', '英语',
    '985学生', '女', null, '河西区', '天津', '河西区友谊路456号',
    '78', '中等', '每周二、四、六下午4:00-6:00', '140元/小时',
    '英语语法基础较弱，经常出现语法错误，希望能系统地学习和巩固语法知识。',
    1
),
-- 高中历史地理
(
    'TJ2024132', '男', '一对一', '高一', '历史,地理',
    '在职老师', '无', '好单子', '南开区', '天津', '南开区黄河道89号',
    '85', '较好', '周末下午2:00-5:00', '160元/小时',
    '文科生，对历史和地理有浓厚兴趣，希望能提高这两门学科的成绩。',
    2
),
-- 小学奥英培训
(
    'TJ2024133', '女', '一对一', '小学', '英语',
    '在职老师', '女', '特殊单子', '和平区', '天津', '和平区西安道234号',
    null, '优秀', '周三、五下午4:00-6:00', '180元/小时',
    '小学五年级学生，英语基础好，希望能参加英语竞赛，需要系统的培训。',
    3
),
-- 高中理科实验班
(
    'TJ2024134', '男', '一对多', '高二', '物理,化学',
    '在职老师', '无', '专职单子', '南开区', '天津', '南开区水上公园东路567号',
    '92', '优秀', '周末上午8:00-12:00', '180元/小时/人',
    '理科实验班，4-5人小组，主攻物理化学实验和难题讲解，提高解题能力。',
    1
),
-- 初中数学竞赛
(
    'TJ2024135', '女', '一对一', '初二', '数学',
    '985学生', '无', '好单子', '河西区', '天津', '河西区绍兴道78号',
    '95', '优秀', '周末下午2:00-4:00', '200元/小时',
    '数学成绩优异，希望能参加数学竞赛，需要教授竞赛类型的数学知识。',
    2
);