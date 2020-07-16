FROM node:14.5.0-alpine

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

ENV NODE_ENV=development

RUN rm -rf node_modules

# install python 3 and attempt not to cry
RUN apk add --no-cache python python-dev python3 python3-dev \
    linux-headers build-base libffi libffi-dev zlib zlib-dev jpeg-dev freetype-dev bash git ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone 

RUN pip3 install wheel
RUN pip3 install WeasyPrint

RUN yarn

RUN yarn global add hackmyresume 

EXPOSE 3001
CMD [ "node", "./index.js" ]