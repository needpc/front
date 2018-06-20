FROM alpine:3.7

LABEL MAINTAINER="Aurelien PERRIER <a.perrier89@gmail.com>"

RUN apk add --no-cache nginx
RUN mkdir -p /run/nginx \
    && touch /run/nginx/nginx.pid
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

WORKDIR /var/www/frontend/src
COPY dist .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
