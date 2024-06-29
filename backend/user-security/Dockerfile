FROM node:20-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci --progress=false


COPY src/ src/
COPY templates/ templates/

ENTRYPOINT [ "npm" , "start" ]