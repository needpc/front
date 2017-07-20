FROM node:8.1.4-alpine
MAINTAINER Aurelien PERRIER <a.perrier89@gmail.com>

WORKDIR /srv/app
COPY angular .

RUN npm install 
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

