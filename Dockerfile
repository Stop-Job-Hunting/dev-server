FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

ENV NODE_ENV=production

RUN rm -rf node_modules

RUN yarn

RUN yarn global add hackmyresume 

EXPOSE 3000
CMD [ "node", "./index.js" ]