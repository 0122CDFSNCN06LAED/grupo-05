-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: database_development
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Data Analytics'),(2,'Backend'),(3,'Frontend'),(4,'UX'),(5,'UI'),(6,'Community Manager');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombreEstado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'activo'),(2,'asignado'),(3,'eliminado'),(4,'finalizado');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensajes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `contenidoMensaje` varchar(100) DEFAULT NULL,
  `fechaMensaje` date NOT NULL,
  `destinatarioId` int(10) unsigned DEFAULT NULL,
  `remitenteId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destinatario_FK` (`destinatarioId`),
  KEY `remitente_FK` (`remitenteId`),
  CONSTRAINT `destinatario_FK` FOREIGN KEY (`destinatarioId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `remitente_FK` FOREIGN KEY (`remitenteId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,'Hola, cÃƒÂ³mo va?','2022-08-07',10,9),(2,'Todo bien','2022-08-08',11,9),(3,'SÃƒÂ­, no hay drama','2022-08-09',9,11),(4,'Prueba Id USS','2022-08-07',9,10);
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectocategoria`
--

DROP TABLE IF EXISTS `proyectocategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectocategoria` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `categoriaId` int(10) unsigned DEFAULT NULL,
  `proyectoId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyectoCategoria_FK` (`proyectoId`),
  KEY `categoria_FK` (`categoriaId`),
  CONSTRAINT `categoria_FK` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `proyectoCategoria_FK` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectocategoria`
--

LOCK TABLES `proyectocategoria` WRITE;
/*!40000 ALTER TABLE `proyectocategoria` DISABLE KEYS */;
INSERT INTO `proyectocategoria` VALUES (1,1,1),(2,2,2);
/*!40000 ALTER TABLE `proyectocategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `imagenProyecto` varchar(10000) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `fechaInicio` date DEFAULT NULL,
  `estadoId` int(10) unsigned DEFAULT NULL,
  `creadorId` int(10) unsigned NOT NULL,
  `fechaCreacion` date NOT NULL,
  `fechaFinalizacion` date DEFAULT NULL,
  `descripcionDetallada` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creador_FK` (`creadorId`),
  KEY `estado_FK` (`estadoId`),
  CONSTRAINT `creador_FK` FOREIGN KEY (`creadorId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `estado_FK` FOREIGN KEY (`estadoId`) REFERENCES `estados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (1,'Analista Funcional Ssr','Se necesita analista funcional con minima expericienda de 8 años y haber trabajado en el sector financiero por al menos 3 años.',NULL,158000,'2022-06-29',1,9,'2022-06-29','2022-06-29','Importante empresa en desarrollo con mas de 25 años de trayectoria brindado soluciones integrales en la gestion documental a 800 empresas (nacionales e internacionales) llevará adelante la implementación de SAP, con la finalidad de garantizar la eficiencia en los procesos.\r\n\r\nCertificada con Normas ISO 90001-2015 e ISO/IEC 27001:2013- Sistema de Seguridad de la información.\r\n\r\nOrientamos la búsqueda: a graduados (o estudiantes avanzados) en carreras de Sistemas, Cs. Económicas, Administración o afines, con probada experiencia en el rol adquirida en empresas y/o consultoras de IT.\r\n\r\nSus responsabilidades eran:\r\n\r\n- Relevamiento de circuitos, validación y testeo de funcionalidades.\r\n\r\n- Asesoramiento/ apoyo a usuarios,\r\n\r\n- Generación de documentación técnica-funcional y participación en programas de mejora.\r\n\r\nRequisitos:\r\n\r\n- Se valorará haber participado en proyectos de implementación de punta a punta.\r\n\r\n- Capacidad analítica, planificación/organización, proactividad y muy buen manejo de relaciones interpersonales son competencias especialmente valoradas.\r\n\r\n- Conocimientos en módulos SD FICO y MM.(PRINCIPALMENTE FI Y SD)-pueden ser Expertise en SD con ganas de integrar los otros módulos .\r\n\r\nIncorporación inmediata bajo relación de dependencia; full time.\r\n\r\nAtractivo paquete de beneficios corporativos.\r\n\r\nZona de trabajo: Barracas (CABA)/Zona Sur.)'),(2,'Programador Fullstack','Se requiere programador fullstack con al menos 2 años de experiencia comprobable. Las actividades se realizan 100% online',NULL,200000,'2022-07-24',1,9,'2022-06-29','2022-08-01',NULL);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectousuario`
--

DROP TABLE IF EXISTS `proyectousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectousuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `postulanteId` int(10) unsigned DEFAULT NULL,
  `proyectoId` int(10) unsigned DEFAULT NULL,
  `ganador` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postulante_FK` (`postulanteId`),
  KEY `proyecto_FK` (`proyectoId`),
  CONSTRAINT `postulante_FK` FOREIGN KEY (`postulanteId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `proyecto_FK` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectousuario`
--

LOCK TABLES `proyectousuario` WRITE;
/*!40000 ALTER TABLE `proyectousuario` DISABLE KEYS */;
INSERT INTO `proyectousuario` VALUES (1,9,1,NULL);
/*!40000 ALTER TABLE `proyectousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipousuario`
--

DROP TABLE IF EXISTS `tipousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipousuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rol` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipousuario`
--

LOCK TABLES `tipousuario` WRITE;
/*!40000 ALTER TABLE `tipousuario` DISABLE KEYS */;
INSERT INTO `tipousuario` VALUES (1,'empresa'),(2,'freelancer'),(3,'admin');
/*!40000 ALTER TABLE `tipousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `username` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `profileURL` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(10000) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tipoUsuarioId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipoUsuario_FK` (`tipoUsuarioId`),
  CONSTRAINT `tipoUsuario_FK` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `tipousuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('admin','admin','admin',NULL,'$2a$10$eCkDZFJ9ybHk7bpkVjpkUu/pyq4gWabaeZZdO7DJoSVkqs//26gOu','admin@admin.com',9,1),('pedro','pedro','admin','sosa','$2a$10$eCkDZFJ9ybHk7bpkVjpkUu/pyq4gWabaeZZdO7DJoSVkqs//26gOu','pedro@.com',10,1),('gonzalo','gonzalo','admin','herrero','$2a$10$b.vLRRQaCJwFCHC3rSiE8uS5dSwEGBI6FfHWqpyW53nfy81P2lnH2','gonzalo@.com',11,1),('kskin','Belen','Diaz','/images/user-images/1658790851324descarga.jpg','$2a$10$dMxvnGBahF0hBn/oZndGNuQWxPX58zCKlg7jCdCzG/gdFgE9XikD6','belenkskin@hotmail.com',13,2);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'database_development'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25 20:25:05
