FROM node:10.15.3-alpine 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x docker-entrypoint.sh

EXPOSE 8001 4000

ENTRYPOINT ["./docker-entrypoint.sh"]