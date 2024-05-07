-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mascotasalud
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gasto`
--

DROP TABLE IF EXISTS `gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gasto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `descripcion` text,
  `valor` double DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `UUID_usuario` varchar(36) NOT NULL,
  `ID_mascota` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `UUID_ususario_fk_idx` (`UUID_usuario`),
  KEY `ID_mascota_fk_idx` (`ID_mascota`),
  CONSTRAINT `ID_mascota_gasto_fk` FOREIGN KEY (`ID_mascota`) REFERENCES `mascota` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UUID_usuario_gasto_fk` FOREIGN KEY (`UUID_usuario`) REFERENCES `usuario` (`UUID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gasto`
--

LOCK TABLES `gasto` WRITE;
/*!40000 ALTER TABLE `gasto` DISABLE KEYS */;
INSERT INTO `gasto` VALUES (17,'antiparasitario',10.42,'2024-04-12','d4935968-ce3c-11ee-95f4-c85acf091108',44),(18,'Pienso',12.53,'2024-03-10','d4935968-ce3c-11ee-95f4-c85acf091108',NULL),(19,'Golosina',1.29,'2024-02-20','d4935968-ce3c-11ee-95f4-c85acf091108',NULL),(22,'antiparasitario',10.4,'2024-02-29','d4935968-ce3c-11ee-95f4-c85acf091108',11),(25,'correa',25,'2024-04-10','d4935968-ce3c-11ee-95f4-c85acf091108',24),(27,'Champu',12.25,'2024-04-05','d4935968-ce3c-11ee-95f4-c85acf091108',NULL),(29,'Rascador',10.99,'2024-04-03','d4935968-ce3c-11ee-95f4-c85acf091108',NULL);
/*!40000 ALTER TABLE `gasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_mascota`
--

DROP TABLE IF EXISTS `historial_mascota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_mascota` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `peso` float DEFAULT NULL,
  `antiparasitario` tinyint(1) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `ID_mascota` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `ID_mascota_fk_idx` (`ID_mascota`),
  CONSTRAINT `ID_mascota_fk` FOREIGN KEY (`ID_mascota`) REFERENCES `mascota` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_mascota`
--

LOCK TABLES `historial_mascota` WRITE;
/*!40000 ALTER TABLE `historial_mascota` DISABLE KEYS */;
INSERT INTO `historial_mascota` VALUES (53,200,1,'2023-02-01',10),(54,370,0,'2023-04-23',10),(55,390,1,'2023-05-13',10),(56,500,0,'2023-06-05',10),(57,870,1,'2023-07-15',10),(58,800,0,'2023-08-01',10),(59,900,1,'2023-09-11',10),(60,1200,0,'2023-10-20',10),(61,990,1,'2023-11-08',10),(62,1120,0,'2023-12-18',10),(63,200,1,'2024-03-15',24),(73,2860,1,'2024-03-01',11),(74,2890,0,'2024-04-01',11),(75,2950,1,'2024-05-01',11),(76,2920,0,'2024-06-01',11),(77,2960,1,'2024-07-01',11),(78,2990,0,'2024-08-01',11),(79,3010,1,'2024-09-01',11),(80,3015,0,'2024-10-01',11),(81,3025,1,'2024-11-01',11),(82,3078,0,'2024-12-01',11),(83,200,1,'2024-03-01',35),(84,350,0,'2024-04-01',35),(85,550,1,'2024-05-01',35),(86,750,0,'2024-06-01',35),(95,289,0,'2024-03-29',24),(96,344,1,'2024-03-14',24),(97,2132,0,'2024-03-04',24),(98,222,1,'2024-03-01',24),(99,222,1,'2024-02-29',24),(100,323,0,'2024-02-01',24),(102,222,1,'2023-09-15',24),(103,111,1,'2024-02-01',24),(104,2233,1,'2024-02-27',24),(105,555,0,'2024-02-12',24),(106,2530,1,'2024-03-06',44),(107,2399,1,'2024-02-13',44),(108,2500,1,'2024-03-30',44);
/*!40000 ALTER TABLE `historial_mascota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mascota`
--

DROP TABLE IF EXISTS `mascota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascota` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `n_chip` varchar(255) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `foto` text,
  `tipo` varchar(45) DEFAULT NULL,
  `raza` varchar(45) DEFAULT NULL,
  `genero` enum('M','H') DEFAULT NULL,
  `vacuna_basica` tinyint DEFAULT NULL,
  `UUID_usuario` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `n_chip_UNIQUE` (`n_chip`),
  KEY `UUID_usuario_fk_idx` (`UUID_usuario`),
  CONSTRAINT `UUID_usuario_mascota_fk` FOREIGN KEY (`UUID_usuario`) REFERENCES `usuario` (`UUID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascota`
--

LOCK TABLES `mascota` WRITE;
/*!40000 ALTER TABLE `mascota` DISABLE KEYS */;
INSERT INTO `mascota` VALUES (10,'Guapa','12312312','2023-02-01','10.jpg','gato','comun europeo','H',1,'d4935968-ce3c-11ee-95f4-c85acf091108'),(11,'Linda','123123123','2017-01-10','11.jpg','gato','comun europeo','H',1,'d4935968-ce3c-11ee-95f4-c85acf091108'),(24,'Estupendo','123','2024-03-15','2af5e41a-d0bf-47c6-a29c-dd3607883843.jpg','gato','comun europeo','M',1,'d4935968-ce3c-11ee-95f4-c85acf091108'),(35,'Lindo',NULL,NULL,NULL,'gato','comun europeo','M',0,'7c38f548-d8ec-11ee-95f4-c85acf091108'),(44,'Lui','1231231','2024-03-05','36397129-f7ad-47a4-bf54-1afbd55612c6.jpg','perro','asd','M',1,'d4935968-ce3c-11ee-95f4-c85acf091108');
/*!40000 ALTER TABLE `mascota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `UUID` varchar(36) NOT NULL DEFAULT (UUID()),
  `email` varchar(45) NOT NULL,
  `password_hash` text NOT NULL,
  `username` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `fecha_nac` date DEFAULT NULL,
  `empleo` varchar(45) DEFAULT NULL,
  `foto` text,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UUID`),
  UNIQUE KEY `UUID_UNIQUE` (`UUID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('7c38f548-d8ec-11ee-95f4-c85acf091108','b@helo.es','$2b$08$V/bv0PcJj.fHIgWtf8GEvekR1n5FcIU970vMpyrHA8tOumt2JAf3u','benito2',NULL,NULL,NULL,NULL,'c1c2078c-9f2c-406a-b57a-60a8ff686181.jpg','2024-03-02 23:27:50'),('d4935968-ce3c-11ee-95f4-c85acf091108','a@helo.es','$2b$08$.8cyVoVnm3092dd2fEBU2umgtgpkXpeHpRoQBvP/uP6gQSTDQlreO','Shade','Manuel','Tomasino','1992-04-26','Estudiante DAW','7abc09ab-05ce-414b-9268-bfa4baf1f9b1.jpg','2024-02-18 09:05:15');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20  1:27:15
