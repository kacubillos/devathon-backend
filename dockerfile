FROM mysql:latest

ENV MYSQL_DATABASE=inventory
ENV MYSQL_USER=asmodeus
ENV MYSQL_PASSWORD=mypassword
ENV MYSQL_ROOT_PASSWORD=rootpassword

# Crear un volumen para almacenar los datos de MySQL
VOLUME /var/lib/mysql

# Copiar los scripts de inicialización de la base de datos (opcional)
COPY init.sql /docker-entrypoint-initdb.d/

# Exponer el puerto 3306 para acceder a la base de datos
EXPOSE 3306

# Iniciar el servicio de MySQL
CMD ["mysqld"]