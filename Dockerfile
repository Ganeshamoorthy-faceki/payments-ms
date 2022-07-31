FROM node:12-alpine 
WORKDIR /users

# ENV NODE_ENV production

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g rimraf

COPY . .

RUN npm install -g pm2

EXPOSE 6000

CMD ["npm", "start"]