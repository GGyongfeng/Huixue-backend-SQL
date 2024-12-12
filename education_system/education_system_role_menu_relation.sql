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
-- Table structure for table `role_menu_relation`
--

DROP TABLE IF EXISTS `role_menu_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_menu_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色',
  `menu_id` int NOT NULL COMMENT '菜单ID',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_menu` (`role`,`menu_id`),
  KEY `menu_id` (`menu_id`),
  CONSTRAINT `role_menu_relation_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menu_list` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色菜单关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_menu_relation`
--

LOCK TABLES `role_menu_relation` WRITE;
/*!40000 ALTER TABLE `role_menu_relation` DISABLE KEYS */;
INSERT INTO `role_menu_relation` VALUES (1,'admin',1,'2024-12-11 11:27:19'),(2,'admin',101,'2024-12-11 11:27:19'),(3,'admin',102,'2024-12-11 11:27:19'),(4,'admin',2,'2024-12-11 11:27:19'),(5,'admin',201,'2024-12-11 11:27:19'),(6,'admin',202,'2024-12-11 11:27:19'),(7,'admin',203,'2024-12-11 11:27:19'),(8,'admin',3,'2024-12-11 11:27:19'),(9,'admin',301,'2024-12-11 11:27:19'),(10,'admin',4,'2024-12-11 11:27:19'),(11,'admin',501,'2024-12-11 11:27:19'),(12,'admin',401,'2024-12-11 11:27:19'),(13,'admin',402,'2024-12-11 11:27:19'),(14,'admin',17,'2024-12-11 11:27:19'),(15,'admin',1701,'2024-12-11 11:27:19'),(16,'manager',1,'2024-12-11 11:27:19'),(17,'manager',101,'2024-12-11 11:27:19'),(18,'manager',102,'2024-12-11 11:27:19'),(19,'manager',2,'2024-12-11 11:27:19'),(20,'manager',201,'2024-12-11 11:27:19'),(21,'manager',202,'2024-12-11 11:27:19'),(22,'manager',203,'2024-12-11 11:27:19'),(23,'manager',3,'2024-12-11 11:27:19'),(24,'manager',301,'2024-12-11 11:27:19'),(25,'manager',4,'2024-12-11 11:27:19'),(26,'manager',501,'2024-12-11 11:27:19'),(27,'manager',17,'2024-12-11 11:27:19'),(28,'manager',1701,'2024-12-11 11:27:19'),(29,'staff',2,'2024-12-11 11:27:19'),(30,'staff',201,'2024-12-11 11:27:19'),(31,'staff',202,'2024-12-11 11:27:19'),(32,'staff',203,'2024-12-11 11:27:19'),(33,'staff',3,'2024-12-11 11:27:19'),(34,'staff',301,'2024-12-11 11:27:19'),(35,'staff',4,'2024-12-11 11:27:19'),(36,'staff',501,'2024-12-11 11:27:19'),(37,'visitor',2,'2024-12-11 11:27:19'),(38,'visitor',201,'2024-12-11 11:27:19');
/*!40000 ALTER TABLE `role_menu_relation` ENABLE KEYS */;
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
