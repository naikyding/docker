FROM node:14.17.1
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
VOLUME ["/app/node_modules"]
CMD node ./bin/www