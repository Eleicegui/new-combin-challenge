FROM nginx:1.17.1-alpine

COPY ./dist/new-combin-challange /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf