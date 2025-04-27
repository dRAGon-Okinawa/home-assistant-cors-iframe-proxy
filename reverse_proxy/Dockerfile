FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY server.js .
COPY run.sh .
COPY cert.pem .
COPY key.pem .

RUN sed -i 's/\r$//' run.sh && chmod +x run.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/run.sh"]