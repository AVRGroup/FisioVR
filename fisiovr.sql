-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: FISIOVR
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.22.04.1

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
-- Table structure for table `exercicios`
--

DROP TABLE IF EXISTS `exercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios` (
  `id_exercicio` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL,
  `caminho_demonstracao` varchar(200) DEFAULT NULL,
  `num_angulos` int DEFAULT NULL,
  `nomes_angulos` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_exercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios`
--

LOCK TABLES `exercicios` WRITE;
/*!40000 ALTER TABLE `exercicios` DISABLE KEYS */;
INSERT INTO `exercicios` VALUES (1,'Elevação Lateral de Ombros','teste','teste',2,'rightElbow, rightShoulder'),(2,'Elevação Lateral de Pernas','teste','teste',1,'rightHip'),(3,'Desenvolvimento de Ombros','teste','teste',2,'rightElbow, rightShoulder'),(4,'Agachamento Sumô','teste','teste',2,'rightKnee, rightHip'),(5,'Agachamento','teste','teste',2,'rightKnee, rightHip'),(6,'Afundo','teste','teste',4,'rightKnee, rightHip, leftKnee, leftHip');
/*!40000 ALTER TABLE `exercicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicios_lista`
--

DROP TABLE IF EXISTS `exercicios_lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios_lista` (
  `id_exercicios_lista` int NOT NULL AUTO_INCREMENT,
  `id_lista` int NOT NULL,
  `id_exercicio` int NOT NULL,
  `num_execucoes` int DEFAULT '0',
  `angulos_concentricos` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` varchar(20) DEFAULT 'AGUARDANDO',
  `tempo_execucao` time DEFAULT NULL,
  `angulos_excentricos` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_exercicios_lista`),
  KEY `id_lista` (`id_lista`),
  KEY `id_exercicio` (`id_exercicio`),
  CONSTRAINT `exercicios_lista_ibfk_1` FOREIGN KEY (`id_lista`) REFERENCES `lista` (`id_lista`),
  CONSTRAINT `exercicios_lista_ibfk_2` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicios` (`id_exercicio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios_lista`
--

LOCK TABLES `exercicios_lista` WRITE;
/*!40000 ALTER TABLE `exercicios_lista` DISABLE KEYS */;
INSERT INTO `exercicios_lista` VALUES (1,1,1,5,'90','Concluído','00:01:00','20'),(2,1,2,8,'45','Concluído','00:01:00','15'),(3,1,3,10,'165;165','Pendente','00:01:00','90;90'),(4,2,1,10,'90','Concluído','00:00:02','20'),(5,2,5,10,'150;15','Concluído','00:00:02','180;15'),(6,2,4,10,'115;45','Concluído','00:00:02','165;15'),(7,2,3,10,'165;165','Pendente','00:00:02','90;90'),(8,3,5,10,'150;15','Pendente','00:00:02','180;15'),(9,3,1,10,'90','Pendente','00:00:02','20'),(10,3,4,10,'115;45','Pendente','00:00:02','165;15');
/*!40000 ALTER TABLE `exercicios_lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista`
--

DROP TABLE IF EXISTS `lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista` (
  `id_lista` int NOT NULL AUTO_INCREMENT,
  `id_profis_responsavel` int NOT NULL,
  `id_paciente` int NOT NULL,
  `datahora_envio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_lista`),
  KEY `id_profis_responsavel` (`id_profis_responsavel`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`id_profis_responsavel`) REFERENCES `profissional` (`id_profissional`),
  CONSTRAINT `lista_ibfk_2` FOREIGN KEY (`id_paciente`) REFERENCES `paciente` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista`
--

LOCK TABLES `lista` WRITE;
/*!40000 ALTER TABLE `lista` DISABLE KEYS */;
INSERT INTO `lista` VALUES (1,1,1,'2022-05-30 15:33:00'),(2,1,2,'2022-05-30 15:33:00'),(3,4,3,'2022-05-30 15:33:00');
/*!40000 ALTER TABLE `lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagem` (
  `id_msg` int NOT NULL AUTO_INCREMENT,
  `id_usu_remetente` int NOT NULL,
  `id_usu_destinatario` int NOT NULL,
  `descricao_msg` varchar(250) DEFAULT NULL,
  `data_hora_envio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_msg`),
  KEY `id_usu_remetente` (`id_usu_remetente`),
  KEY `id_usu_destinatario` (`id_usu_destinatario`),
  CONSTRAINT `mensagem_ibfk_1` FOREIGN KEY (`id_usu_remetente`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `mensagem_ibfk_2` FOREIGN KEY (`id_usu_destinatario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagem`
--

LOCK TABLES `mensagem` WRITE;
/*!40000 ALTER TABLE `mensagem` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paciente`
--

DROP TABLE IF EXISTS `paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paciente` (
  `id_paciente` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_prof_resp` int NOT NULL,
  `desc_problema` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_paciente`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paciente`
--

LOCK TABLES `paciente` WRITE;
/*!40000 ALTER TABLE `paciente` DISABLE KEYS */;
INSERT INTO `paciente` VALUES (1,1,1,'problemas nas articulações do braço'),(2,5,1,'problemas no joelho'),(3,6,4,'Problemas no ombro');
/*!40000 ALTER TABLE `paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profissional`
--

DROP TABLE IF EXISTS `profissional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissional` (
  `id_profissional` int NOT NULL AUTO_INCREMENT,
  `crm` int NOT NULL,
  `id_usuario` int NOT NULL,
  PRIMARY KEY (`id_profissional`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `profissional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissional`
--

LOCK TABLES `profissional` WRITE;
/*!40000 ALTER TABLE `profissional` DISABLE KEYS */;
INSERT INTO `profissional` VALUES (1,130422,2),(4,657890,4);
/*!40000 ALTER TABLE `profissional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_exercicio`
--

DROP TABLE IF EXISTS `status_exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_exercicio` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `desc_status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_exercicio`
--

LOCK TABLES `status_exercicio` WRITE;
/*!40000 ALTER TABLE `status_exercicio` DISABLE KEYS */;
INSERT INTO `status_exercicio` VALUES (1,'Pendente'),(2,'Concluído');
/*!40000 ALTER TABLE `status_exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_usuario`
--

DROP TABLE IF EXISTS `tipo_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_usuario` (
  `id_tipo` int NOT NULL,
  `desc_tipo_usu` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_usuario`
--

LOCK TABLES `tipo_usuario` WRITE;
/*!40000 ALTER TABLE `tipo_usuario` DISABLE KEYS */;
INSERT INTO `tipo_usuario` VALUES (1,'administrador'),(2,'profissional'),(3,'paciente');
/*!40000 ALTER TABLE `tipo_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `login` varchar(15) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cpf` double NOT NULL,
  `telefone` double NOT NULL,
  `id_tipo_usuario` int NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'paciente1','123456789','usuario1','usuario1@gmail.com',12765689727,32991687765,3),(2,'profissional1','prof1','profisional1','profisional1@gmail.com',12765689727,32991687765,2),(3,'admin','adm10321','administrador','adm@gmail.com',12765689727,32991687765,1),(4,'profissional2','prof2','profissioanl2','profisional2@gmail.com',12765689727,32991687765,2),(5,'paciente2','user2','usuario2','usuario2@gmail.com',12765689727,32991687765,3),(6,'paciente3','user3','Joana Costa','paciente3@gmail.com',12765689727,32991687765,3);
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

-- Dump completed on 2022-09-16 16:46:04


/*
Adicionando novas tabelas ao banco de dados
*/
ALTER TABLE exercicios ADD valores_excentricos varchar(100);
ALTER TABLE exercicios ADD valores_concentricos varchar(100);

alter table usuario add `data_cadastro` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP;
