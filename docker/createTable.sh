#!/bin/bash

#get the container id
ID=`docker ps -aqf "name=docker_db"`

#Create tables
docker exec -i $ID mysql -uroot -proot < ./mysql/CreateTable.sql
