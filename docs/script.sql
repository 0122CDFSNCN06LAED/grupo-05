-- grupo_05.categorias definition
DROP DATABASE IF EXISTS grupo_05
CREATE DATABASE grupo_05
USE grupo_05

CREATE TABLE `categorias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreCategoria` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.estados definition

CREATE TABLE `estados` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreEstado` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.tipoUsuario definition

CREATE TABLE `tipoUsuario` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `rol` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.usuarios definition

CREATE TABLE `usuarios` (
  `username` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  `profileURL` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `imagenUsuario` varchar(10000) DEFAULT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipoUsuarioId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tipoUsuario_FK` (`tipoUsuarioId`),
  CONSTRAINT `tipoUsuario_FK` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `tipoUsuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.mensajes definition

CREATE TABLE `mensajes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `contenidoMensaje` varchar(100) DEFAULT NULL,
  `fechaMensaje` date NOT NULL,
  `destinatarioId` int unsigned DEFAULT NULL,
  `remitenteId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `destinatario_FK` (`destinatarioId`),
  KEY `remitente_FK` (`remitenteId`),
  CONSTRAINT `destinatario_FK` FOREIGN KEY (`destinatarioId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `remitente_FK` FOREIGN KEY (`remitenteId`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.proyectos definition

CREATE TABLE `proyectos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `imagenProyecto` varchar(10000) DEFAULT NULL,
  `precio` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFinalizacion` varchar(100) DEFAULT NULL,
  `estadoId` int unsigned DEFAULT NULL,
  `creador` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creador_FK` (`creador`),
  KEY `estado_FK` (`estadoId`),
  CONSTRAINT `creador_FK` FOREIGN KEY (`creador`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `estado_FK` FOREIGN KEY (`estadoId`) REFERENCES `estados` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.proyectousuario definition

CREATE TABLE `proyectousuario` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `postulanteId` int unsigned DEFAULT NULL,
  `proyectoId` int unsigned DEFAULT NULL,
  `ganador` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `postulante_FK` (`postulanteId`),
  KEY `proyecto_FK` (`proyectoId`),
  CONSTRAINT `postulante_FK` FOREIGN KEY (`postulanteId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `proyecto_FK` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- grupo_05.proyectoCategoria definition

CREATE TABLE `proyectoCategoria` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `categoriaId` int unsigned DEFAULT NULL,
  `proyectoId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyectoCategoria_FK` (`proyectoId`),
  KEY `categoria_FK` (`categoriaId`),
  CONSTRAINT `categoria_FK` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`),
  CONSTRAINT `proyectoCategoria_FK` FOREIGN KEY (`proyectoId`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;