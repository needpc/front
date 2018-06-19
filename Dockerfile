FROM node:9.11.1-alpine

LABEL MAINTAINER="Aurelien PERRIER <a.perrier89@gmail.com>"

WORKDIR /srv/app
COPY angular .

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng", "serve", "--public-host", "https://www.needpc.fr", "--host", "0.0.0.0"]
