FROM ubuntu:18.04
FROM nginx:alpine


RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt.get install -y nodejs
RUN node -v
RUN npm -v
RUN npm install
RUN ng build --prod
COPY ./dist/flippermods/ /usr/share/nginx/html/
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf
