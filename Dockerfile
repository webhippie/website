FROM webhippie/caddy:latest
MAINTAINER Thomas Boerger <thomas@webhippie.de>

EXPOSE 8080

ADD _site /srv/www
RUN chown -R caddy:caddy /srv/www
