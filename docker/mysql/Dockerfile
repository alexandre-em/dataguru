FROM mysql:8.0

EXPOSE 3306


ENV MYSQL_DATABASE=dataguruDB
ENV MYSQL_USER=dataguru
ENV MYSQL_PASSWORD=dataguru1234
# Password for root access
ENV MYSQL_ROOT_PASSWORD=root

# Create Database
RUN mkdir /usr/sql
RUN chmod 644 /usr/sql

ADD ["CreateTable.sql", "./docker-entrypoint-initdb.d/CreateTable.sql"]