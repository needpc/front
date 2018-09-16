FROM alpine:3.8

LABEL MAINTAINER="Aurelien PERRIER <a.perrier89@gmail.com>"

RUN apk add --no-cache nginx
RUN mkdir -p /run/nginx \
    && touch /run/nginx/nginx.pid
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stdout /var/log/nginx/error.log

WORKDIR /var/www/frontend/src
COPY nginx/default.conf /etc/nginx/conf.d/default.conf 
COPY dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
