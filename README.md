# MascotaSalud
## Proyecto final del grado superior Desarrollo de Aplicaciones Web

El proyecto es una aplicacion full stack.

El stack utilizado es el siguiente:

### Frontend
- React + TypeScript
- Styled-Components

### Backend
- NodeJS (v20.10.0) + Express (v4.18.2)
- MySql v8

Usando MVC pattern para el Backend

## DATABASE CREATION

```sql
CREATE TABLE `mascotasalud`.`account` (
  `UUID` BINARY(16) NOT NULL DEFAULT (UUID()),
  `email` VARCHAR(45) NOT NULL,
  `password_hash` TEXT NOT NULL,
  `username` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `dateOfBirth` DATE NULL,
  `job` VARCHAR(45) NULL,
  PRIMARY KEY (`UUID`),
  UNIQUE INDEX `UUID_UNIQUE` (`UUID` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
```

## Images
https://unsplash.com/es/fotos/foto-de-primer-plano-de-gato-atigrado-cWOzOnSoh6Q