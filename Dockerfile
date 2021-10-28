FROM node:16-alpine3.11

RUN mkdir /signup-email-ms

WORKDIR /signup-email-ms

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG MONGO_URL
ARG PASSWORD_PASSPHRASE 
ARG ACCESS_TOKEN_SECRET 
ARG REFRESH_TOKEN_SECRET 


ENV AWS_ACCESS_KEY_ID ${AWS_ACCESS_KEY_ID}
ENV AWS_SECRET_ACCESS_KEY ${AWS_SECRET_ACCESS_KEY}
ENV AWS_DEFAULT_REGION ${AWS_DEFAULT_REGION}
ENV MONGO_URL ${MONGO_URL}
ENV PASSWORD_PASSPHRASE ${PASSWORD_PASSPHRASE}
ENV ACCESS_TOKEN_SECRET ${ACCESS_TOKEN_SECRET}
ENV REFRESH_TOKEN_SECRET ${REFRESH_TOKEN_SECRET}
ENV PORT 5000

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]