#Comandos Utilizados

###Creación imagen
docker build . -t jf1/nwapp 

###Crear contenedor
docker run --name ct1fj -d  -p 49160:8080 --network redjf1 jf1/nwapp

###Crear contenedor mongo
docker run --name mongodbjf --hostname localhost -d -p 27019:27017 --network redjf1 mongo 

###mockear la Base de Datos
docker cp db_sample/users.json  mongodbjf:/users.json
docker exec -it mongodbjf mongoimport --db users --collection datos --file /users.json --jsonArray