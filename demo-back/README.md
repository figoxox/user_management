# README #
Este repositorio contiene el backend de el manejo de usuario.

### ¿Qué usa este repositorio? ###
* Java 1.8
* Spring Boot 2.3.4
* Maven 3.5
* PostgreSQL 10
* Hibernate 5.4.21

### ¿Cómo configuro mi proyecto? ###
* Crear una base de datos llamada `demo` en PostgreSQL.
* Abrir archivo de configuración de la aplicación `demo-back\src\main\resources\application.properties`.
* Configurar el ítem `Spring DATASOURCE`, el cuál contiene información tal como la url de la base de datos, usuario y contraseña.
* Configurar el ítem `Mail properties`, para este ejemplo, se configuro con un correo de GMail en donde hay que modificar el username (sin agregar @gmail) y la contraseña.
* Adicionalmente, se configuró el correo de GMail para aplicaciones menos seguras, enlace [aquí.](https://support.google.com/accounts/answer/6010255?hl=es)

### ¿Cómo inicio mi proyecto? ###
* Abrir una consola o terminal en la raíz del proyecto (donde se encuentra el archivo README) y ejecutar:
```bash
mvn spring-boot:run
```
* El servidor quedará por defecto en `http://localhost:8080`.