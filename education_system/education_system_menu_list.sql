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
-- Table structure for table `menu_list`
--

DROP TABLE IF EXISTS `menu_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '菜单标题',
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '路由路径',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '路由名称',
  `icon` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图标编码',
  `title_en` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '英文标题',
  `no_menu` tinyint(1) DEFAULT '0' COMMENT '是否在菜单中隐藏 0-显示 1-隐藏',
  `parent_id` int DEFAULT NULL COMMENT '父级菜单ID',
  `show_badge` tinyint(1) DEFAULT '0' COMMENT '是否显示徽标 0-不显示 1-显示',
  `show_text_badge` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文字徽标内容',
  `auth_list` json DEFAULT NULL COMMENT '权限列表',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_path` (`path`),
  CONSTRAINT `menu_list_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menu_list` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1702 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='菜单列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_list`
--

LOCK TABLES `menu_list` WRITE;
/*!40000 ALTER TABLE `menu_list` DISABLE KEYS */;
INSERT INTO `menu_list` VALUES (1,'监控中心','/dashboard','Dashboard','e721','Dashboard',0,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(2,'家教订单','/tutors','Tutors','e7ae','Tutors Orders',0,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(3,'用户中心','/user','User','e84f','User manguage',1,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(4,'通知编辑','/notification','Notice','e84f','Teacher notice',0,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(17,'版本计划','/plan','Plan','e712','Version Plan',0,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(18,'结果页面','/result','Result','e715','Result page',0,NULL,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(101,'工作台','/dashboard/console',NULL,NULL,'Workbench',0,1,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(102,'分析页','/dashboard/analysis',NULL,NULL,'Analysis',0,1,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(201,'订单列表','/tutors/list',NULL,NULL,'Orders list',0,2,0,'Hot',NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(202,'上传订单','/tutors/create',NULL,NULL,'Create Order',0,2,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(203,'编辑订单','/tutors/edit',NULL,NULL,'Edit Order',0,2,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(301,'个人中心','/user/user',NULL,NULL,'User center',1,3,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(401,'成功页','/result/success',NULL,NULL,'Success page',0,18,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(402,'失败页','/result/fail',NULL,NULL,'Fail page',0,18,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(501,'更新通知','/notification/update',NULL,NULL,'Notice update',0,4,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19'),(1701,'更新日志','/plan/log',NULL,NULL,'Update log',0,17,0,NULL,NULL,'2024-12-11 11:27:19','2024-12-11 11:27:19');
/*!40000 ALTER TABLE `menu_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12  1:40:07
