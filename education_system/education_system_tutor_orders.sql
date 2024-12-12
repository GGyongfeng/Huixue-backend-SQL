-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: education_system
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tutor_orders`
--

DROP TABLE IF EXISTS `tutor_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tutor_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编号',
  `student_gender` enum('男','女') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '学生性别',
  `teaching_type` enum('一对一','一对多') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '教学类型',
  `student_grade` enum('幼儿','小学','初一','初二','初三','高一','高二','高三','成人','其他') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '年级',
  `subjects` set('语文','数学','英语','物理','化学','生物','历史','地理','政治','国际课程','其他') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '科目',
  `teacher_type` enum('在职老师','985学生') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '教师水平要求',
  `teacher_gender` enum('男','女') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '教师性别要求',
  `order_tags` text COLLATE utf8mb4_unicode_ci COMMENT '订单标签（多个标签用逗号分隔）',
  `district` enum('南开区','和平区','河西区','河东区','河北区','红桥区','津南区','滨海新区') COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所在区域',
  `city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '天津' COMMENT '所在城市',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '详细地址',
  `grade_score` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '成绩',
  `student_level` enum('优秀','较好','中等','不及格') COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '学生水平',
  `tutoring_time` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '补习时间',
  `salary` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '薪资信息',
  `requirement_desc` text COLLATE utf8mb4_unicode_ci COMMENT '需求详细描述',
  `phone_number` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '联系方式',
  `order_source` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '订单来源',
  `is_visible` tinyint(1) DEFAULT '1' COMMENT '是否可见',
  `status` enum('已成交','未成交') COLLATE utf8mb4_unicode_ci DEFAULT '未成交' COMMENT '订单状态',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `created_by` int DEFAULT NULL COMMENT '创建人ID',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `updated_by` int DEFAULT NULL COMMENT '更新人ID',
  `is_deleted` tinyint(1) DEFAULT '0' COMMENT '是否删除',
  `deleted_by` int DEFAULT NULL COMMENT '删除人ID',
  `deleted_at` timestamp NULL DEFAULT NULL COMMENT '删除时间',
  `order_count` int DEFAULT '0' COMMENT '接单数量',
  `deal_time` timestamp NULL DEFAULT NULL COMMENT '成交时间',
  `deal_teacher_id` int DEFAULT NULL COMMENT '成交教师ID',
  `deal_staff_id` int DEFAULT NULL COMMENT '成交员工ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tutor_code` (`tutor_code`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  KEY `deleted_by` (`deleted_by`),
  KEY `deal_teacher_id` (`deal_teacher_id`),
  KEY `deal_staff_id` (`deal_staff_id`),
  KEY `idx_tutor_code` (`tutor_code`),
  KEY `idx_tutor_city` (`city`),
  CONSTRAINT `tutor_orders_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `staff` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tutor_orders_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `staff` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tutor_orders_ibfk_3` FOREIGN KEY (`deleted_by`) REFERENCES `staff` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tutor_orders_ibfk_4` FOREIGN KEY (`deal_teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tutor_orders_ibfk_5` FOREIGN KEY (`deal_staff_id`) REFERENCES `staff` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_orders`
--

LOCK TABLES `tutor_orders` WRITE;
/*!40000 ALTER TABLE `tutor_orders` DISABLE KEYS */;
INSERT INTO `tutor_orders` VALUES (1,'TJ2024001','男','一对一','高二','数学,物理','985学生',NULL,'加急单子','南开区','天津','南开区水上公园东路38号','89','中等','每周二、四晚上7:00-9:00','150元/小时','高二理科生，数学物理成绩中等，希望能提高解题思路和方法，为高考做准备。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(2,'TJ2024002','女','一对一','初三','英语','在职老师','女','专职单子','和平区','天津','和平区南京路22号','65','不及格','周六、日上午9:00-11:00','200元/小时','初三女生，英语基础较差，听力和口语都需要提升，希望能在中考前有明显进步。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(3,'TJ2024003','男','一对多','高一','数学,物理','985学生',NULL,'好单子','河西区','天津','河西区黑牛城道120号','92','优秀','每周三、五下午4:00-6:00','100元/小时/人','高一理科生，成绩优秀，希望能保持并更上一层楼，可以和同学一起上课。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(4,'TJ2024004','女','一对一','小学','语文,英语','在职老师','女','专职单子','南开区','天津','南开区白堤路25号','78','中等','周一、三、五下午2:00-4:00','120元/小时','小学五年级女生，语文作文和英语口语需要提升，希望能有耐心的老师长期辅导。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(5,'TJ2024005','男','一对一','初二','物理,化学','985学生',NULL,'加急单子','河北区','天津','河北区狮子林大街18号','71','不及格','工作日晚上6:30-8:30','180元/小时','初二男生，理科成绩较差，期中考试不理想，希望能在期末前突击提高。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(6,'TJ2024101','男','一对一','高二','数学,物理','985学生',NULL,'加急单子','南开区','天津','南开区水上公园东路38号','89','中等','每周二、四晚上7:00-9:00','150元/小时','高二理科生，数学物理成绩中等，希望能提高解题思路和方法，为高考做准备。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(7,'TJ2024102','女','一对一','高三','化学,生物','在职老师','女','好单子','和平区','天津','和平区南京路22号','92','较好','周末上午9:00-11:00','200元/小时','理科重点班学生，化学生物基础好，希望能冲刺更高分数。老师要求有高考教学经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(8,'TJ2024103','男','一对一','高一','数学,英语','985学生',NULL,'加急单子','河西区','天津','河西区黑牛城道120号','75','不及格','每周一、三、五晚上6:00-8:00','130元/小时','高一新生，英语和数学都比较薄弱，需要帮助打好基础，提高学习兴趣。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(9,'TJ2024104','女','一对多','初三','语文,数学,英语','在职老师','女','专职单子','南开区','天津','南开区白堤路45号','85','中等','周末全天','180元/小时','初三备考阶段，三科都需要提高，最好是有中考经验的老师。可以和其他同学一起上课。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(10,'TJ2024105','男','一对一','初二','数学,物理','985学生',NULL,NULL,'河北区','天津','河北区狮子林大街78号','78','中等','每周二、四、六下午4:00-6:00','120元/小时','初二学生，物理刚开始学习，需要打好基础。数学成绩一般，希望能提高。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(11,'TJ2024106','女','一对一','小学','语文,英语','在职老师','女','好单子','和平区','天津','和平区西安道89号',NULL,'较好','周一到周五下午3:00-5:00','100元/小时','小学四年级学生，希望提高语文写作和英语口语能力。要求老师有小学教学经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(12,'TJ2024107','男','一对一','小学','数学','985学生',NULL,'特殊单子','滨海新区','天津','滨海新区第五大街2号',NULL,'优秀','周末下午2:00-4:00','150元/小时','小学六年级学生，数学成绩优秀，希望能学习奥数，为将来参加竞赛做准备。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(13,'TJ2024108','女','一对一','高二','国际课程','在职老师',NULL,'好单子,特殊单子','和平区','天津','和平区重庆道56号','A','优秀','工作日晚上7:00-9:00','300元/小时','IB课程学生，需要数学和物理科目的辅导，要求老师有IB教学经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(14,'TJ2024109','女','一对一','小学','其他','在职老师','女',NULL,'河西区','天津','河西区友谊路234号',NULL,'中等','周末上午10:00-12:00','200元/小时','小学三年级学生，想学习钢琴，完全零基础。要求老师有教授儿童钢琴的经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(15,'TJ2024110','男','一对一','高三','语文,数学,英语,物理,化学','在职老师',NULL,'好单子,加急单子','南开区','天津','南开区鞍山西道300号','88','中等','周末全天','200元/小时','高三学生，理科综合成绩中等，希望能在各科都有提升。要求老师经验丰富。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(16,'TJ2024111','女','一对一','初一','英语','985学生','女',NULL,'津南区','天津','津南区咸水沽镇体育场路2号','82','中等','寒假集中辅导','130元/小时','初一学生，希望利用寒假时间提高英语成绩，重点是语法和口语。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(17,'TJ2024112','男','一对一','高一','数学,物理','在职老师','男','特殊单子','红桥区','天津','红桥区芥园道78号','65','不及格','每天晚上6:00-8:00','180元/小时','学生有轻度注意力不集中，需要老师有相关教学经验，善于和学生沟通。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(18,'TJ2024113','女','一对一','初三','数学,物理','985学生',NULL,'好单子','和平区','天津','和平区南营门街45号','95','优秀','周末下午2:00-5:00','200元/小时','数理竞赛培训，学生基础好，希望能在竞赛中取得好成绩。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(19,'TJ2024114','男','一对多','高二','数学,英语','在职老师',NULL,'专职单子','南开区','天津','南开区华苑路18号','80','中等','周末上午9:00-12:00','100元/小时/人','三个高二学生一起上课，水平相近，希望能互相促进提高。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(20,'TJ2024115','女','一对一','幼儿','英语','在职老师','女','特殊单子','和平区','天津','和平区南京路156号',NULL,NULL,'周三、五下午3:00-4:00','150元/小时','幼儿园大班学生，希望通过游戏和互动的方式学习英语，培养兴趣。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(21,'TJ2024116','男','一对一','高三','数学,物理,化学','在职老师',NULL,'好单子','南开区','天津','南开区卫津路26号','78','中等','每周六、日全天','200元/小时','理科生，希望能在高考前提高理科成绩，特别是物理和化学科目。老师要求有丰富高考经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(22,'TJ2024117','女','一对一','初二','英语','985学生','女','加急单子','河西区','天津','河西区友谊路89号','85','较好','周一、三、五晚上7:00-9:00','150元/小时','英语基础不错，希望能进一步提高口语和写作能力。希望老师是英语专业或有海外背景。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(23,'TJ2024118','男','一对一','小学','语文,数学,英语','在职老师','女','专职单子','和平区','天津','和平区南京路128号',NULL,'中等','工作日下午4:00-6:00','120元/小时','小学五年级学生，希望能有老师辅导全科作业，提高学习效率。要求老师有小学教学经验。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(24,'TJ2024119','女','一对一','高三','语文,历史,政治','在职老师',NULL,'好单子','河东区','天津','河东区十一经路56号','88','较好','每周六、日上午8:00-12:00','180元/小时','文科生，目标是重点大学，需要提高文科各科目成绩。希望老师能提供高效的复习方法。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(25,'TJ2024120','男','一对一','小学','数学','985学生',NULL,'特殊单子','南开区','天津','南开区水上公园北路12号',NULL,'优秀','周末下午2:00-4:00','200元/小时','小学六年级学生，数学成绩优异，希望参加奥数比赛，需要系统的奥数训练。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(26,'TJ2024121','女','一对一','高二','生物,地理','在职老师',NULL,NULL,'河西区','天津','河西区解放南路234号','82','中等','周末上午9:00-11:00','160元/小时','理科生，地理和生物成绩一般，希望能提高这两科的考试技巧和应��能力。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(27,'TJ2024122','男','一对一','初二','物理','985学生',NULL,'加急单子','南开区','天津','南开区红旗南路78号','70','不及格','每周二、四晚上6:30-8:30','140元/小时','刚开始学习物理，感觉比较吃力，需要老师从基础开始讲解，培养物理思维。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(28,'TJ2024123','女','一对一','高一','英语','在职老师','女','特殊单子','和平区','天津','和平区南市街45号','90','优秀','周末下午3:00-5:00','180元/小时','英语笔试成绩不错，但口语较弱，希望能提高口语和听力能力。最好是外教或有留学背景的老师。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(29,'TJ2024124','男','一对一','初三','语文','在职老师',NULL,NULL,'河北区','天津','河北区金钟河大街167号','75','中等','周三、五晚上7:00-9:00','130元/小时','语文作文和阅读理解较弱，希望能提高写作水平和阅读理解能力。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(30,'TJ2024125','女','一对多','小学','英语','985学生','女','专职单子','和平区','天津','和平区南营门街67号',NULL,'较好','周末上午10:00-12:00','100元/小时/人','小学三年级，3-4人小班，通过游戏和互动方式学习英语，培养英语兴趣。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(31,'TJ2024126','男','一对一','高二','数学','在职老师',NULL,'好单子','南开区','天津','南开区华苑路90号','85','较好','每周一、三、五晚上7:30-9:30','170元/小时','数学基础尚可，希望能提高解题速度和正确率，为高考做准备。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(32,'TJ2024127','女','一对一','初一','语文,数学,英语,物理','在职老师','女','专职单子','河西区','天津','河西区梅江道123号','72','中等','周末全天','150元/小时','初一新生，各科成绩都需要提高，希望能有老师全面辅导，打好基础。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(33,'TJ2024128','男','一对一','高二','化学','985学生',NULL,'特殊单子','南开区','天津','南开区王顶堤大街45号','80','中等','周末下午2:00-4:00','160元/小时','化学实验操作和计算较弱，希望能加强这方面的训练，提高实验能力。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(34,'TJ2024129','女','一对一','小学','语文,数学','在职老师','女',NULL,'河东区','天津','河东区大王庄路78号',NULL,'中等','工作日下午3:00-5:00','110元/小时','小学二年级学生，需要老师辅导完成作业，培养良好的学习习惯。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(35,'TJ2024130','男','一对一','高三','政治','在职老师',NULL,'加急单子','和平区','天津','和平区南京路345号','82','中等','周末上午9:00-11:00','170元/小时','高考备考，政治科目需要提高，希望能掌握答题技巧和热点分析方法。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(36,'TJ2024131','女','一对一','初三','英语','985学生','女',NULL,'河西区','天津','河西区友谊路456号','78','中等','每周二、四、六下午4:00-6:00','140元/小时','英语语法基础较弱，经常出现语法错误，希望能系统地学习和巩固语法知识。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(37,'TJ2024132','男','一对一','高一','历史,地理','在职老师',NULL,'好单子','南开区','天津','南开区黄河道89号','85','较好','周末下午2:00-5:00','160元/小时','文科生，对历史和地理有浓厚兴趣，希望能提高这两门学科的成绩。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(38,'TJ2024133','女','一对一','小学','英语','在职老师','女','特殊单子','和平区','天津','和平区西安道234号',NULL,'优秀','周三、五下午4:00-6:00','180元/小时','小学五年级学生，英语基础好，希望能参加英语竞赛，需要系统的培训。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',3,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(39,'TJ2024134','男','一对多','高二','物理,化学','在职老师',NULL,'专职单子','南开区','天津','南开区水上公园东路567号','92','优秀','周末上午8:00-12:00','180元/小时/人','理科实验班，4-5人小组，主攻物理化学实验和难题讲解，提高解题能力。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',1,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL),(40,'TJ2024135','女','一对一','初二','数学','985学生',NULL,'好单子','河西区','天津','河西区绍兴道78号','95','优秀','周末下午2:00-4:00','200元/小时','数学成绩优异，希望能参加数学竞赛，需要教授竞赛类型的数学知识。',NULL,NULL,1,'未成交','2024-12-11 07:31:56',2,'2024-12-11 07:31:56',NULL,0,NULL,NULL,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tutor_orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12  1:40:06
