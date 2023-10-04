FROM alpine/git as clone
WORKDIR /app
RUN git clone -b dev https://oauth2:glpat-4hPy8bCAZS5qaMQHggxZ@git.avmb.com.br/academico/plataforma-cadastral/frontend.git

FROM node:lts as build-stage
WORKDIR /nginx
COPY --from=clone ./app/frontend/config/nginx/default.conf ./
WORKDIR /app
COPY --from=clone ./app/frontend/ ./
RUN npm install && npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/* /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
