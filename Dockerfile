FROM nginx:alpine

RUN apk update
RUN apk add curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | -E bash -
RUN apk add  nodejs
RUN node -v
RUN npm -v
RUN npm install
RUN ng build --prod

COPY ./dist/flippermods/ /usr/share/nginx/html/
COPY /docker/nginx.conf /etc/nginx/conf.d/default.conf
