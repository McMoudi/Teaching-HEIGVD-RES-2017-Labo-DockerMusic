FROM node:7.7.3
MAINTAINER McMoudi <mcmoudi@gmail.com>

#
# When we build the image, we copy the executable jar in the image file system.
#
COPY src /opt/app/


WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]
