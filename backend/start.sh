#sudo docker stop mongodb
#sudo docker rm mongodb
#sudo docker run --name mongodb -d -p 27017:27017 -v ~/data:/data/db mongo

sudo docker stop mysqldb
sudo docker rm mysqldb
sudo docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=geogame -p 3306:3306 -d mysql:5.7.23

sudo docker stop phpmyadmin
sudo docker rm phpmyadmin
sudo docker run --name phpmyadmin -d --link mysqldb:db -p 8081:80 phpmyadmin/phpmyadmin
