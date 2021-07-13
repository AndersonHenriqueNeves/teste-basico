-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema testebasico
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema testebasico
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `testebasico` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `testebasico` ;

-- -----------------------------------------------------
-- Table `testebasico`.`SequelizeMeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testebasico`.`SequelizeMeta` (
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `testebasico`.`salas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testebasico`.`salas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_sala` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `testebasico`.`professores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testebasico`.`professores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_sala` INT NULL DEFAULT NULL,
  `nome` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_sala` (`id_sala` ASC) VISIBLE,
  CONSTRAINT `professores_ibfk_1`
    FOREIGN KEY (`id_sala`)
    REFERENCES `testebasico`.`salas` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `testebasico`.`alunos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `testebasico`.`alunos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_professor` INT NULL DEFAULT NULL,
  `nome` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_professor` (`id_professor` ASC) VISIBLE,
  CONSTRAINT `alunos_ibfk_1`
    FOREIGN KEY (`id_professor`)
    REFERENCES `testebasico`.`professores` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
