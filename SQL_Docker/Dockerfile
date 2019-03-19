FROM mariadb:10.4.3-bionic

ENV MYSQL_RANDOM_ROOT_PASSWORD=yes
ENV MYSQL_USER=CNTrain
ENV MYSQL_DATABASE=CNTrain
ENV MYSQL_PASSWORD=CNTrain

COPY init.sql /docker-entrypoint-initdb.d

WORKDIR /home/mariadb

EXPOSE 3306
