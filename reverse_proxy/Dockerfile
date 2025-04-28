FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY server.js .
COPY run.sh .

RUN chmod +x run.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/run.sh"]